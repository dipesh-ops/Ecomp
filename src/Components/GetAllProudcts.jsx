import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import myContext from '../context/myContext'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, deleteFromCart } from '../Redux/cartSlice'
import { toast } from 'react-toastify'
import Loading from './Loading'

const GetAllProducts = () => {
    const cartItems = useSelector((state) => state.cart);
    const context = useContext(myContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { getAllProducts, loading } = context;

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added To Cart");
    }

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Deleted From Cart");
    }

    return loading ? <Loading /> : (
        <div className='p-4 sm:p-6 lg:p-8 mt-6 md:mt-8'>
            {/* Header */}
            <div className='mb-6 md:mb-8'>
                <h1 className='font-semibold text-xl sm:text-2xl lg:text-3xl'>All Products</h1>
                <div className='w-12 sm:w-16 h-0.5 bg-emerald-500 mt-2'></div>
            </div>

            {/* Products Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6'>
                {getAllProducts.map((item, index) => {
                    const isInCart = cartItems.some((p) => p.id === item.id);
                    
                    return (
                        <div key={index} className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
                            {/* Product Image */}
                            <div className='cursor-pointer mb-4' onClick={() => navigate(`/product/${item.id}`)}>
                                <img 
                                    className='w-full h-70 sm:h-70 md:h-48 lg:h-56 object-contain rounded-md hover:scale-105 transition-transform'
                                    src={item.productImage} 
                                    alt={item.title}
                                />
                            </div>

                            {/* Product Info */}
                            <div>
                                <h1 className='font-bold text-base sm:text-lg line-clamp-2 cursor-pointer hover:text-emerald-600 mb-2'
                                    onClick={() => navigate(`/product/${item.id}`)}>
                                    {item.title}
                                </h1>
                                
                                <p className='font-semibold text-lg sm:text-xl text-emerald-600 mb-4'>
                                    ${item.price}
                                </p>

                                {/* Cart Button */}
                                <button 
                                    onClick={() => isInCart ? deleteCart(item) : addCart(item)}
                                    className={`w-full py-3 rounded-lg cursor-pointer text-white font-medium flex items-center justify-center gap-2
                                        ${isInCart ? 'bg-orange-500 hover:bg-orange-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}
                                >
                                    <i className={isInCart ? 'ri-delete-bin-line' : 'ri-shopping-cart-line'}></i>
                                    {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Empty State */}
            {getAllProducts.length === 0 && (
                <div className='text-center py-12 md:py-16'>
                    <i className="ri-inbox-line text-5xl md:text-6xl text-gray-300 mb-4"></i>
                    <h2 className='text-lg md:text-xl text-gray-500 font-medium'>No products found</h2>
                </div>
            )}
        </div>
    )
}

export default GetAllProducts