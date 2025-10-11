import React from 'react'
import { useNavigate } from 'react-router-dom'

const category = [
    {
        icon: 'ri-handbag-fill',
        name: 'fashion',
        href: '#fashion'
    },
    {
        icon: 'ri-shirt-fill',
        name: 'shirt',
        href: '#shirt'
    },
    {
        icon: 'ri-t-shirt-fill',
        name: 'jacket',
        href: '#jacket'
    },
    {
        icon: 'ri-smartphone-fill',
        name: 'mobile',
        href: '#mobile'
    },
    {
        icon: 'ri-macbook-fill',
        name: 'laptop',
        href: '#laptop'
    },
    {
        icon: 'ri-footprint-fill',
        name: 'shoes',
        href: '#shoes'
    },
    {
        icon: 'ri-home-fill',
        name: 'home',
        href: '#home'
    },
    {
        icon: 'ri-magic-fill',
        name: 'electronics',
        href: '#electronics'
    },
    {
        icon: 'ri-book-2-fill',
        name: 'books',
        href: '#books'
    }
]

const Category = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
            {/* Mobile & Tablet: Horizontal Scroll */}
            <div className="block md:hidden">
                <div className="flex mt-6 gap-3 overflow-x-auto scrollbar-hide pb-3 -mx-3 px-3">
                    {category.map((item, index) => (
                        <div key={index} className="flex-shrink-0">
                            <button
                                onClick={() => navigate(`/category/${item.name}`)}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 
                                         p-2.5 px-3 rounded-lg border border-gray-200 
                                         transition-all duration-200 flex flex-col items-center 
                                         gap-1.5 min-w-[70px] shadow-sm hover:shadow-md"
                                aria-label={`Browse ${item.name} category`}
                            >
                                <i className={`${item.icon} text-lg`}></i>
                                <span className="text-xs font-medium capitalize whitespace-nowrap">
                                    {item.name}
                                </span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tablet (Landscape) & Small Desktop: Compact Grid */}
            <div className="hidden md:block lg:hidden">
                <div className="mt-6 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-5 gap-3">
                    {category.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => navigate(`/category/${item.name}`)}
                            className="bg-white hover:bg-gray-50 p-3 rounded-lg border border-gray-200 
                                     transition-all duration-200 flex flex-col items-center gap-2 
                                     shadow-sm hover:shadow-md"
                            aria-label={`Browse ${item.name} category`}
                        >
                            <i className={`${item.icon} text-xl`}></i>
                            <span className="text-sm font-medium capitalize">
                                {item.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Desktop: Full Grid */}
            <div className="hidden lg:block">
                <div className="mt-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-9 gap-4">
                    {category.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => navigate(`/category/${item.name}`)}
                            className="bg-white hover:bg-gray-50 p-4 rounded-lg border border-gray-200 
                                     transition-all duration-200 flex flex-col items-center gap-3 
                                     shadow-sm hover:shadow-md hover:scale-105"
                            aria-label={`Browse ${item.name} category`}
                        >
                            <i className={`${item.icon} text-2xl`}></i>
                            <span className="text-base font-medium capitalize">
                                {item.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Category