import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { decrementQuantity, deleteFromCart, incrementQuantity } from '../Redux/cartSlice';
import myContext from '../context/myContext';
import { addDoc, collection } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';
import { toast } from 'react-toastify';
import Loading from "./Loading";

const CartPage = () => {
    const user = JSON.parse(localStorage.getItem("users"));    
    const [myAddress, setMyAddress] = useState({});
    const [selectedAddressId, setSelectedAddressId] = useState('');
    const [isPlacingOrder, setIsPlacingOrder] = useState(false); // New loading state

    const context = useContext(myContext);
    const {addresses, loading, setLoading} = context;

    const userAddresses = addresses.filter(address => address.userId === user?.uid);
    const navigate = useNavigate();
    
    const cartItems = useSelector((state)=> state.cart);
    const dispatch = useDispatch();

    const deleteCart = (item) =>{
        dispatch(deleteFromCart(item))
    }

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id))
    };

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id))
    };

    const handleAddressChange = (e) =>{
        const selectedId = e.target.value
        setSelectedAddressId(selectedId)

        const selectedAddress = addresses.find((address)=> address.id === selectedId);

        if(selectedAddress){
            setMyAddress(selectedAddress)
        }
    }

    const orderFunction = async ()=>{
        if (!myAddress || Object.keys(myAddress).length === 0) {
            toast.error("Please Select The Address");
            return
        }
        if (!user) {
            navigate('/login');
        }
        
        setIsPlacingOrder(true); // Start loading
        setLoading(true);

        const orderData = {
            cartItems,
            address : myAddress,
            name : user?.name,
            email : user?.email,
            status : "confirmed",
            userId : user?.uid,
            totalAmount : cartDiscount,
            date : new Date().toLocaleString(
                "en-US",
                {
                    month : "short",
                    day : "2-digit",
                    year : "numeric"
                }
            )
        }
        try {
            const orderRef = collection(fireDB, 'order');
            await addDoc(orderRef, orderData);
            
            // Add a small delay to show loading state
            setTimeout(() => {
                if(user.role === "user"){
                    navigate('/user-dashboard');
                }
                else{
                    navigate('/admin-dashboard');
                }
                toast.success("Order Placed Successfully");
                setIsPlacingOrder(false);
                setLoading(false);
            }, 1500); // 1.5 second delay to show loading
            
        } catch (error) {
            console.log(error);
            toast.error("Failed to place order");
            setIsPlacingOrder(false);
            setLoading(false);
        }
    }

    const cartItemTotal = cartItems.map(item => item.quantity).reduce((prevState, currValue)=> prevState + currValue, 0);
    const cartTotal = cartItems.map(item => item.price * item.quantity).reduce((prevState, currValue)=> prevState + currValue, 0);
    const cartDiscount = cartItems.map(item => (item.price * item.quantity) - item.discount).reduce((prevState, currValue)=> prevState + currValue, 0);
    const discountOf = cartTotal - cartDiscount        

    // Show main loading or order placing loading
    if (loading || isPlacingOrder) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto"></div>
                    <p className="mt-4 text-lg font-semibold text-gray-600">
                        {isPlacingOrder ? "Placing your order..." : "Loading..."}
                    </p>
                    {isPlacingOrder && (
                        <p className="mt-2 text-sm text-gray-500">
                            Please wait while we process your order
                        </p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className='mx-4 sm:mx-6 lg:mx-8 mt-6 lg:mt-8 bg-white p-4 sm:p-6 rounded-lg'>
            <div className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
                {/* Cart Items Section */}
                <div className='w-full lg:w-[70%]'>
                    <div className='flex justify-between p-4'>
                        <h1 className='text-xl sm:text-2xl text-gray-500'>Your <span className='text-emerald-500'>Cart</span></h1>
                        <p className='text-gray-400'>{cartItems.length} Items</p>
                    </div>
                    <hr className='w-full border-none h-0.5 bg-gray-300 mb-4'/>

                    {cartItems.length === 0 ? (
                        // Empty Cart State
                        <div className='text-center py-12'>
                            <i className="ri-shopping-cart-line text-6xl text-gray-300 mb-4"></i>
                            <p className='text-gray-500 text-lg mb-4'>Your cart is empty</p>
                            <Link 
                                to="/" 
                                className='inline-flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors'
                            >
                                <i className="ri-arrow-left-line"></i>
                                Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        // Cart has items - Show products
                        <>
                            {/* Mobile Cart Items */}
                            <div className='block lg:hidden'>
                                {cartItems.map((item, index) => {
                                    const {id, quantity} = item;
                                    return(
                                        <div key={index} className='bg-gray-50 p-4 rounded-lg mb-4 border'>
                                            <div className='flex gap-4'>
                                                <img className='w-20 h-20 object-cover rounded' src={item.productImage} alt="No Image" />
                                                <div className='flex-grow'>
                                                    <h2 className='font-semibold text-sm line-clamp-2'>{item.title}</h2>
                                                    <p className='text-emerald-600 font-bold mt-1'>${item.price}</p>
                                                    
                                                    <div className='flex items-center gap-2 mt-2'>
                                                        <button onClick={()=> handleDecrement(id)} className='w-6 h-6 bg-gray-200 rounded flex items-center justify-center'>-</button>
                                                        <span className='w-8 text-center'>{quantity}</span>
                                                        <button onClick={()=>handleIncrement(id)} className='w-6 h-6 bg-gray-200 rounded flex items-center justify-center'>+</button>
                                                    </div>
                                                    
                                                    <p className='font-semibold mt-2'>Subtotal: ${item.price * quantity}</p>
                                                    <button onClick={()=> deleteCart(item)} className='text-red-500 text-sm mt-2'>Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Desktop Cart Table */}
                            <div className='hidden lg:block overflow-x-auto'>
                                <table className='w-full border-collapse'>
                                    <thead>
                                        <tr className='border-b'>
                                            <th className='text-left py-3'>Image</th>
                                            <th className='text-left py-3'>Product Title</th>
                                            <th className='text-left py-3'>Price</th>
                                            <th className='text-left py-3'>Quantity</th>
                                            <th className='text-left py-3'>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item, index) => {
                                            const {id, quantity} = item;
                                            return(
                                                <tr key={index} className='border-b'>
                                                    <td className='py-4'><img className='w-16 h-16 object-cover rounded' src={item.productImage} alt="No Image" /></td>
                                                    <td className='py-4'>{item.title}</td>
                                                    <td className='py-4'>${item.price}</td>
                                                    <td className='py-4'>
                                                        <div className='flex items-center gap-2'>
                                                            <button onClick={()=> handleDecrement(id)} className='w-8 h-8 bg-gray-200 rounded flex items-center justify-center'>-</button>
                                                            <span className='w-8 text-center'>{quantity}</span>
                                                            <button onClick={()=>handleIncrement(id)} className='w-8 h-8 bg-gray-200 rounded flex items-center justify-center'>+</button>
                                                        </div>
                                                        <button onClick={()=> deleteCart(item)} className='text-red-500 text-sm mt-2'>Remove</button>
                                                    </td>
                                                    <td className='py-4'>$ {item.price * quantity}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>

                {/* Order Summary Section - Only show when cart has items */}
                {cartItems.length > 0 && (
                    <div className='w-full lg:w-[30%] bg-gray-50 p-4 sm:p-6 rounded-lg h-fit'>
                        <h1 className='font-semibold text-lg sm:text-xl'>Order Summary</h1>
                        <hr className='mt-2 border-none h-0.5 bg-gray-300 mb-4'/>

                        {/* Improved Address Selection */}
                        <div className='mb-4'>
                            <div className='flex items-center justify-between mb-2'>
                                <h1 className='font-semibold text-sm sm:text-base'>DELIVERY ADDRESS</h1>
                                {selectedAddressId && (
                                    <span className='text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full'>
                                        Selected
                                    </span>
                                )}
                            </div>
                            
                            {userAddresses.length > 0 ? (
                                <div className='space-y-3'>
                                    <select 
                                        value={selectedAddressId} 
                                        onChange={handleAddressChange}
                                        className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm sm:text-base bg-white'
                                    >
                                        <option value="" className='text-gray-400'>Choose a delivery address</option>
                                        {userAddresses.map((add, index) => (
                                            <option key={index} value={add.id} className='py-2'>
                                                {add.name} - {add.address.substring(0, 30)}...
                                            </option>
                                        ))}
                                    </select>
                                    
                                    {/* Selected Address Preview */}
                                    {selectedAddressId && myAddress && (
                                        <div className='bg-white p-3 rounded-lg border border-emerald-200 shadow-sm'>
                                            <div className='flex items-start gap-2'>
                                                <i className="ri-map-pin-fill text-emerald-500 mt-1"></i>
                                                <div>
                                                    <p className='font-semibold text-sm'>{myAddress.name}</p>
                                                    <p className='text-xs text-gray-600 mt-1'>{myAddress.address}</p>
                                                    <p className='text-xs text-gray-600'>{myAddress.pincode}, {myAddress.state}</p>
                                                    <p className='text-xs text-gray-600 mt-1'>
                                                        <i className="ri-phone-fill mr-1"></i>
                                                        {myAddress.mobileNumber}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className='text-center p-4 border border-dashed border-gray-300 rounded-lg'>
                                    <i className="ri-map-pin-line text-2xl text-gray-400 mb-2"></i>
                                    <p className='text-sm text-gray-500 mb-3'>No addresses found</p>
                                </div>
                            )}
                            
                            <Link 
                                to="/address" 
                                className='w-full bg-white border border-emerald-500 text-emerald-600 p-3 mt-3 cursor-pointer rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base font-medium hover:bg-emerald-50 transition-colors'
                            >
                                <i className="ri-add-line"></i>
                                Add New Address
                            </Link>
                        </div>
                        
                        <hr className='mt-4 border-none h-0.5 bg-gray-300 mb-4'/>

                        <div className='space-y-3'>
                            <div className='flex justify-between font-semibold'>
                                <h1>ITEMS {cartItemTotal}</h1>
                                <span>$ {cartTotal}</span>
                            </div>

                            <div className='flex justify-between'>
                                <h1>Shipping Fee</h1>
                                <span className='font-semibold text-emerald-600'>Free</span>
                            </div>

                            <div className='flex justify-between'>
                                <h1>Discount</h1>
                                <span className='font-semibold text-emerald-600'>$ {discountOf}</span>
                            </div>

                            <hr className='border-gray-300'/>
                            
                            <div className='flex justify-between text-lg font-bold'>
                                <h1>Total</h1>
                                <span>$ {cartDiscount}</span>
                            </div>
                            
                            <button 
                                onClick={orderFunction} 
                                disabled={!selectedAddressId || isPlacingOrder}
                                className={`w-full mt-4 text-white p-3 rounded-lg font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${
                                    selectedAddressId && !isPlacingOrder
                                        ? 'bg-emerald-500 hover:bg-emerald-600 cursor-pointer' 
                                        : 'bg-gray-400 cursor-not-allowed'
                                }`}
                            >
                                {isPlacingOrder ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        Processing Order...
                                    </>
                                ) : (
                                    selectedAddressId ? 'Place Order' : 'Select Address to Continue'
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartPage