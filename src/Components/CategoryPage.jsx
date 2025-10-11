import React, { useContext } from 'react'
import myContext from '../context/myContext'
import { Link, useParams } from 'react-router-dom';
import Loading from './Loading';

const CategoryPage = () => {
    const {categoryname} = useParams();
    const context = useContext(myContext);
    const {getAllProducts, loading} = context;

    const filterProduct = getAllProducts.filter((obj)=> obj.category.includes(categoryname))

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
                    {filterProduct.map((item, index) => (
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
                                    className='w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 text-sm sm:text-base mt-auto'
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <i className="ri-shopping-cart-line"></i>
                                    Add to Cart
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CategoryPage