import React, { useContext, useState } from 'react'
import myContext from '../context/myContext';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const context = useContext(myContext);
  const navigate = useNavigate();
  const { getAllProducts } = context;
  const [search, setSearch] = useState("");
  
  const filteredSearchData = getAllProducts.filter((obj) => 
    obj.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='mt-4 sm:mt-6 lg:mt-8 px-3 sm:px-4 lg:px-6'>
        {/* Search Input */}
        <div className='relative max-w-2xl mx-auto'>
            <input 
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                className='w-full p-3 sm:p-4 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent pl-4 sm:pl-5 pr-10 sm:pr-12 text-sm sm:text-base'
                type="text" 
                placeholder='Search for products...'
            />
            <div className='absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2'>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
        </div>

        {/* Dropdown Results */}
        {search && (
            <div className="flex justify-center">
                <div className="absolute bg-white w-[95vw] sm:w-full max-w-2xl z-50 mt-2 rounded-lg shadow-lg border border-gray-200 max-h-60 sm:max-h-80 overflow-y-auto">
                    {filteredSearchData.length > 0 ? (
                        <div className="py-1 sm:py-2">
                            {filteredSearchData.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="px-3 sm:px-4 py-2 sm:py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                    onClick={() => {
                                        navigate(`/product/${item.id}`);
                                        setSearch("");
                                    }}
                                >
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <img 
                                            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-cover rounded" 
                                            src={item.productImage} 
                                            alt={item.title}
                                        />
                                        <div className="flex-grow min-w-0">
                                            <h3 className="font-medium text-xs sm:text-sm md:text-base text-gray-800 line-clamp-1">
                                                {item.title}
                                            </h3>
                                            <p className="text-emerald-600 font-semibold text-xs sm:text-sm">${item.price}</p>
                                        </div>
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-6 sm:py-8 px-4">
                            <img 
                                className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4" 
                                src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png" 
                                alt="No results" 
                            />
                            <p className="text-gray-500 text-xs sm:text-sm md:text-base text-center">
                                No products found for "{search}"
                            </p>
                            <p className="text-gray-400 text-xs mt-1">
                                Try different keywords
                            </p>
                        </div>
                    )}
                </div>
            </div>
        )}
    </div>
  )
}

export default Search