import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import myContext from '../context/myContext'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../Redux/cartSlice';
import { toast } from 'react-toastify';
import Loading from './Loading';

const ProductCards = () => {
    const context = useContext(myContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);
    const { getAllProducts, loading } = context;

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to Cart");
    }

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Deleted From Cart");
    }

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems))
    }, [cartItems])

    return loading ? <Loading /> : (
        <div className='flex justify-center mt-6 md:mt-8 px-3 sm:px-4 md:px-6'>
            <div className='w-full max-w-7xl'>
                {/* Responsive Grid */}
                <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6 lg:gap-7'>
                    {getAllProducts.map((item, index) => {
                        const isInCart = cartItems.some((p) => p.id === item.id);
                        
                        return (
                            <div 
                                key={index} 
                                className='bg-white p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col h-full'
                            >
                                {/* Product Image */}
                                <div 
                                    className='flex-shrink-0 cursor-pointer overflow-hidden rounded-md'
                                    onClick={() => navigate(`/product/${item.id}`)}
                                >
                                    <img 
                                        className='w-full h-90 sm:h-50 md:h-44 lg:h-52 object-contain hover:scale-105 transition-transform duration-300' 
                                        src={item.productImage} 
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                </div>

                                {/* Product Info */}
                                <div className='flex flex-col flex-grow mt-3 sm:mt-4'>
                                    <h1 
                                        className='font-bold text-sm sm:text-base line-clamp-2 cursor-pointer hover:text-emerald-600 transition-colors flex-grow'
                                        onClick={() => navigate(`/product/${item.id}`)}
                                    >
                                        {item.title}
                                    </h1>
                                    
                                    <p className='font-semibold text-lg sm:text-xl text-emerald-600 mt-2 mb-3'>
                                        ${item.price}
                                    </p>

                                    {/* Cart Button */}
                                    <button 
                                        onClick={() => isInCart ? deleteCart(item) : addCart(item)}
                                        className={`w-full py-2 sm:py-2.5 px-3 sm:px-4 rounded-md text-white font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base mt-auto
                                            ${isInCart 
                                                ? 'bg-orange-500 hover:bg-orange-600 active:bg-orange-700' 
                                                : 'bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700'
                                            }
                                        `}
                                    >
                                        <i className={`${isInCart ? 'ri-delete-bin-line' : 'ri-shopping-cart-line'}`}></i>
                                        {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Empty State */}
                {getAllProducts.length === 0 && (
                    <div className='text-center py-12 md:py-16 lg:py-20'>
                        <i className="ri-inbox-line text-5xl md:text-6xl text-gray-300 mb-4"></i>
                        <h2 className='text-lg md:text-xl text-gray-500 font-medium'>No products available</h2>
                        <p className='text-gray-400 mt-1 text-sm md:text-base'>Check back later for new products</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductCards