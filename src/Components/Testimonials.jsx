import React, { useState, useEffect } from 'react'

const testimonials = [
    {
        name: 'Sarah Johnson',
        feedback: 'The quality of products exceeded my expectations! Fast shipping and excellent customer service. Will definitely shop again!',
        image: 'https://img.freepik.com/free-vector/hand-drawn-compliment-illustration_52683-107992.jpg?semt=ais_hybrid&w=740&q=80'
    },
    {
        name: 'Mike Chen',
        feedback: 'Amazing shopping experience! The products are exactly as described and the delivery was super fast. Highly recommended!',
        image: 'https://img.freepik.com/free-vector/hand-drawn-compliment-illustration_52683-107992.jpg?semt=ais_hybrid&w=740&q=80'
    },
    {
        name: 'Emily Davis',
        feedback: 'I am very satisfied with my purchase. The customer support team was incredibly helpful and responsive to my queries.',
        image: 'https://img.freepik.com/free-vector/hand-drawn-compliment-illustration_52683-107992.jpg?semt=ais_hybrid&w=740&q=80'
    },
    {
        name: 'David Wilson',
        feedback: 'Great service and quality products! The packaging was secure and the items arrived in perfect condition.',
        image: 'https://img.freepik.com/free-vector/hand-drawn-compliment-illustration_52683-107992.jpg?semt=ais_hybrid&w=740&q=80'
    },
    {
        name: 'Lisa Martinez',
        feedback: 'Fast delivery and excellent customer support. The product quality is outstanding for the price. Very happy with my order!',
        image: 'https://img.freepik.com/free-vector/hand-drawn-compliment-illustration_52683-107992.jpg?semt=ais_hybrid&w=740&q=80'
    },
    {
        name: 'James Thompson',
        feedback: 'Outstanding shopping experience! The website is easy to navigate and the checkout process was smooth. Will be a returning customer!',
        image: 'https://img.freepik.com/free-vector/hand-drawn-compliment-illustration_52683-107992.jpg?semt=ais_hybrid&w=740&q=80'
    }
]

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsToShow, setItemsToShow] = useState(3);

    // Update items to show based on screen size
    useEffect(() => {
        const updateItemsToShow = () => {
            if (window.innerWidth < 640) {
                setItemsToShow(1);
            } else if (window.innerWidth < 1024) {
                setItemsToShow(2);
            } else {
                setItemsToShow(3);
            }
        };

        updateItemsToShow();
        window.addEventListener('resize', updateItemsToShow);
        
        return () => window.removeEventListener('resize', updateItemsToShow);
    }, []);

    // Auto slide
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex, itemsToShow]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex >= testimonials.length - itemsToShow ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? testimonials.length - itemsToShow : prevIndex - 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className='flex justify-center mt-8 mb-5 px-4 sm:px-6 lg:px-8'>
            <div className='bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm border w-full max-w-7xl'>
                <div className='text-center mb-6 lg:mb-8'>
                    <h1 className='text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800'>What Our Customers Say</h1>
                    <p className='text-gray-600 mt-2 text-sm sm:text-base'>Hear from our satisfied customers</p>
                </div>
                
                {/* Carousel Container */}
                <div className='relative'>
                    {/* Carousel Content */}
                    <div className='overflow-hidden'>
                        <div 
                            className='flex transition-transform duration-500 ease-in-out'
                            style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
                        >
                            {testimonials.map((item, index) => (
                                <div 
                                    key={index} 
                                    className='flex-shrink-0 px-2 sm:px-3'
                                    style={{ width: `${100 / itemsToShow}%` }}
                                >
                                    <div className='bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center h-full'>
                                        <img 
                                            className='w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full object-cover mb-4 border-4 border-white shadow-sm' 
                                            src={item.image} 
                                            alt={item.name}
                                        />
                                        <h2 className='font-bold text-base sm:text-lg text-gray-800 mb-3'>{item.name}</h2>
                                        <p className='text-gray-600 text-sm leading-relaxed flex-grow'>
                                            "{item.feedback}"
                                        </p>
                                        <div className='flex text-yellow-400 mt-4'>
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-current" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dots Indicator */}
                    <div className='flex justify-center mt-6 space-x-2'>
                        {Array.from({ length: testimonials.length - itemsToShow + 1 }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    index === currentIndex ? 'bg-emerald-500 w-4' : 'bg-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonials