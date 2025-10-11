import React, { useContext } from 'react'
import myContext from '../context/myContext';
import Loading from './Loading';

const UserDashboard = () => {
  const context = useContext(myContext);
  const {myOrder, loading} = context;

  const user = JSON.parse(localStorage.getItem("users"));
  const filteredOrder = myOrder.filter(order => order.userId === user?.uid);

  return loading ? <Loading/> : (
    <div className='mx-4 sm:mx-6 lg:mx-8 mt-6 lg:mt-8'>
      {/* User Profile Card */}
      <div className='w-full p-4 sm:p-6 bg-white rounded-lg shadow-sm border mb-6 lg:mb-8'>
        <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-6'>
          <img 
            className='w-24 sm:w-32 lg:w-40' 
            src="https://www.svgrepo.com/show/192244/man-user.svg" 
            alt="User Profile" 
          />
          <div className='text-center sm:text-left'>
            <h1 className='text-lg sm:text-xl lg:text-2xl font-semibold'>{user.name}</h1>
            <p className='text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg'>{user.email}</p>
            <div className='mt-2 sm:mt-3'>
              <span className='bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium'>
                {user.role}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Order Details Section */}
      <div className='mb-4 sm:mb-6'>
        <h1 className='font-semibold text-xl sm:text-2xl lg:text-3xl px-2 sm:px-4 py-3'>Order Details</h1>
        
        {filteredOrder.length === 0 ? (
          <div className='text-center py-8 sm:py-12 bg-white rounded-lg'>
            <i className="ri-inbox-line text-4xl sm:text-5xl text-gray-300 mb-3"></i>
            <p className='text-gray-500 text-sm sm:text-base'>No orders found</p>
            <p className='text-gray-400 text-xs sm:text-sm mt-1'>Your orders will appear here</p>
          </div>
        ) : (
          <div className='space-y-4 sm:space-y-6'>
            {filteredOrder.map((order) => (
              <div key={order.id} className='bg-white rounded-lg shadow-sm border overflow-hidden'>
                {/* Order Header - Mobile */}
                <div className='block sm:hidden p-4 bg-emerald-50 border-b'>
                  <div className='space-y-2'>
                    <div className='flex justify-between'>
                      <span className='font-semibold text-sm'>Order ID:</span>
                      <span className='text-sm'>#{order.id.substring(0, 8)}...</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='font-semibold text-sm'>Date:</span>
                      <span className='text-sm'>{order.date}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='font-semibold text-sm'>Total:</span>
                      <span className='font-semibold'>₹{order.totalAmount}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='font-semibold text-sm'>Status:</span>
                      <span className='text-emerald-600 text-sm font-semibold'>Confirmed</span>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col sm:flex-row'>
                  {/* Order Info - Desktop */}
                  <div className='hidden sm:block bg-emerald-50 w-full sm:w-[30%] lg:w-[25%] p-4 border-r'>
                    <div className='space-y-4'>
                      <div>
                        <h3 className='font-semibold text-sm text-gray-600'>ORDER ID</h3>
                        <p className='text-xs mt-1'>#{order.id.substring(0, 12)}...</p>
                      </div>
                      <div>
                        <h3 className='font-semibold text-sm text-gray-600'>DATE</h3>
                        <p className='text-xs mt-1'>{order.date}</p>
                      </div>
                      <div>
                        <h3 className='font-semibold text-sm text-gray-600'>TOTAL AMOUNT</h3>
                        <p className='text-lg font-bold mt-1'>₹{order.totalAmount}</p>
                      </div>
                      <div>
                        <h3 className='font-semibold text-sm text-gray-600'>STATUS</h3>
                        <span className='inline-block bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-semibold mt-1'>
                          Confirmed
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className='w-full sm:w-[70%] lg:w-[75%]'>
                    {order.cartItems.map((ord) => (
                      <div key={ord.id} className='p-3 sm:p-4 border-b last:border-b-0'>
                        <div className='flex gap-3 sm:gap-4'>
                          <img 
                            className='w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover rounded-lg flex-shrink-0' 
                            src={ord.productImage} 
                            alt={ord.title} 
                          />
                          <div className='flex-grow flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2'>
                            <div className='flex-grow'>
                              <h2 className='font-semibold text-sm sm:text-base line-clamp-2'>{ord.title}</h2>
                              <p className='text-gray-500 text-xs sm:text-sm mt-1'>{ord.category}</p>
                              <div className='flex items-center gap-4 mt-2 sm:mt-3'>
                                <span className='text-xs sm:text-sm text-gray-600'>Qty: {ord.quantity}</span>
                              </div>
                            </div>
                            <div className='sm:text-right'>
                              <p className='font-semibold text-sm sm:text-base'>₹{ord.price}</p>
                              <p className='text-xs sm:text-sm text-gray-500 mt-1'>
                                Subtotal: ₹{ord.price * ord.quantity}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserDashboard