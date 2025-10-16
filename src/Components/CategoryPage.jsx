import React, { useContext, useEffect } from 'react'
import myContext from '../context/myContext'
import { Link, useParams } from 'react-router-dom';
import Loading from './Loading';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart, deleteFromCart } from '../Redux/cartSlice';

const CategoryPage = () => {
    const {categoryname} = useParams();
    const context = useContext(myContext);
    const cartItems = useSelector((state) => state.cart);
    const {getAllProducts, loading} = context;

    const filterProduct = getAllProducts.filter((obj)=> obj.category.includes(categoryname))

    const dispatch = useDispatch();

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Product added to cart");
    }

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Product removed from cart");
    }

    useEffect(() => {
            localStorage.setItem("cart", JSON.stringify(cartItems))
        }, [cartItems])

    return loading ? <Loading/> : (
        <div className='mx-4 sm:mx-6 lg:mx-8'>
            <div className='text-center mt-6 lg:mt-8'>
                <h1 className='font-semibold text-xl sm:text-2xl lg:text-3xl first-letter:uppercase'>
                    {categoryname}
                </h1>
                
                {!filterProduct.length && (
                    <div className='text-center py-8 sm:py-12 lg:py-16'>
                        <i className="ri-inbox-line text-4xl sm:text-5xl text-gray-300 mb-3"></i>
                        <h2 className='text-gray-500 text-lg sm:text-xl'>No {categoryname} Found</h2>
                        <p className='text-gray-400 text-sm sm:text-base mt-1'>Check back later for new products</p>
                        <Link 
                            to="/" 
                            className='inline-block mt-4 bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600'
                        >
                            Continue Shopping
                        </Link>
                    </div>
                )}
            </div>

            {filterProduct.length > 0 && (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mt-6 lg:mt-8'>
                    {filterProduct.map((item, index) => {
                        const isInCart = cartItems.some((p) => p.id === item.id);
                        (
                        <Link 
                            to={`/product/${item.id}`} 
                            key={index} 
                            className='bg-white p-4 rounded-lg shadow-sm hover:shadow-md border border-gray-100 flex flex-col'
                        >
                            <div className='mb-4'>
                                <img 
                                    className='w-full h-48 sm:h-52 md:h-48 lg:h-56 object-contain hover:scale-105 transition-transform rounded-md' 
                                    src={item.productImage} 
                                    alt={item.title}
                                />
                            </div>

                            <div className='flex flex-col flex-grow'>
                                <h1 className='font-bold text-base sm:text-lg line-clamp-2 flex-grow'>
                                    {item.title}
                                </h1>
                                
                                <p className='font-semibold text-lg sm:text-xl text-emerald-600 my-3'>
                                    ${item.price}
                                </p>

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
                        </Link>
                    )})}
                </div>
            )}
        </div>
    )
}

export default CategoryPage