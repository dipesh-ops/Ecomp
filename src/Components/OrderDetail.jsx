import React, { useContext, useState } from 'react'
import myContext from '../context/myContext';
import { Link } from 'react-router-dom';

const OrderDetail = () => {
    const context = useContext(myContext);
    const { myOrder, deleteOrder } = context;

    const [deletingOrderId, setDeletingOrderId] = useState(null);

    const handleDeleteOrder = async (orderId) => {
        setDeletingOrderId(orderId);
        try {
            await deleteOrder(orderId);
        } catch (error) {
            console.log(error);
        } finally {
            setDeletingOrderId(null);
        }
    }

    return (
        <div>
            <h1 className='font-semibold text-xl mb-4'>All Orders</h1>
            
            {/* Mobile View */}
            <div className='block lg:hidden space-y-4'>
                {myOrder.map((order, orderIndex) => (
                    <div key={orderIndex} className='bg-white p-4 rounded-lg border space-y-4'>
                        {/* Order Header */}
                        <div className='border-b pb-3'>
                            <div className='flex justify-between items-start'>
                                <div>
                                    <p className='text-sm text-gray-500'>Order #{order.id.slice(0, 8)}...</p>
                                    <p className='font-semibold'>{order.name}</p>
                                    <p className='text-sm text-gray-600'>{order.email}</p>
                                </div>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    order.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {order.status}
                                </span>
                            </div>
                            <p className='text-sm text-gray-500 mt-2'>{order.date}</p>
                        </div>

                        {/* Order Items */}
                        {order.cartItems.map((item, itemIndex) => (
                            <div key={itemIndex} className='flex gap-3 p-3 bg-gray-50 rounded'>
                                <img className='w-16 h-16 object-cover rounded' src={item.productImage} alt={item.title} />
                                <div className='flex-grow'>
                                    <h3 className='font-medium text-sm line-clamp-2'>{item.title}</h3>
                                    <p className='text-gray-600 text-xs'>{item.category}</p>
                                    <div className='flex justify-between items-center mt-2'>
                                        <span className='text-emerald-600 font-bold'>₹{item.price}</span>
                                        <span className='text-gray-500'>Qty: {item.quantity}</span>
                                    </div>
                                    <p className='text-sm font-semibold mt-1'>Total: ₹{item.price * item.quantity}</p>
                                </div>
                            </div>
                        ))}

                        {/* Address Info */}
                        <div className='text-sm'>
                            <p className='font-medium'>{order.address.name}</p>
                            <p className='text-gray-600'>{order.address.address}</p>
                            <p className='text-gray-600'>{order.address.pincode}</p>
                            <p className='text-gray-600'>{order.address.phone}</p>
                        </div>

                        {/* Action Button */}
                        <button 
                            onClick={() => handleDeleteOrder(order.id)}
                            disabled={deletingOrderId === order.id}
                            className={`w-full text-white py-2 rounded text-sm font-medium flex items-center justify-center gap-2 ${
                                deletingOrderId === order.id 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-red-500 hover:bg-red-600'
                            }`}
                        >
                            {deletingOrderId === order.id ? (
                                <>
                                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                    Deleting...
                                </>
                            ) : (
                                'Delete Order'
                            )}
                        </button>
                    </div>
                ))}
            </div>

            {/* Desktop View */}
            <div className='hidden lg:block overflow-x-auto bg-white rounded-lg border'>
                <table className='w-full'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='px-4 py-3 text-left text-sm font-semibold'>Order ID</th>
                            <th className='px-4 py-3 text-left text-sm font-semibold'>Product</th>
                            <th className='px-4 py-3 text-left text-sm font-semibold'>Price</th>
                            <th className='px-4 py-3 text-left text-sm font-semibold'>Qty</th>
                            <th className='px-4 py-3 text-left text-sm font-semibold'>Total</th>
                            <th className='px-4 py-3 text-left text-sm font-semibold'>Status</th>
                            <th className='px-4 py-3 text-left text-sm font-semibold'>Customer</th>
                            <th className='px-4 py-3 text-left text-sm font-semibold'>Date</th>
                            <th className='px-4 py-3 text-left text-sm font-semibold'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y'>
                        {myOrder.map((order, orderIndex) => (
                            order.cartItems.map((item, itemIndex) => (
                                <tr key={`${orderIndex}-${itemIndex}`} className='hover:bg-gray-50'>
                                    <td className='px-4 py-3 text-sm font-mono'>#{order.id.slice(0, 8)}...</td>
                                    <td className='px-4 py-3'>
                                        <div className='flex items-center gap-3'>
                                            <img className='w-10 h-10 object-cover rounded' src={item.productImage} alt={item.title} />
                                            <div>
                                                <p className='font-medium text-sm'>{item.title}</p>
                                                <p className='text-gray-500 text-xs'>{item.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-4 py-3 text-sm font-semibold text-emerald-600'>₹{item.price}</td>
                                    <td className='px-4 py-3 text-sm text-gray-600'>{item.quantity}</td>
                                    <td className='px-4 py-3 text-sm font-semibold'>₹{item.price * item.quantity}</td>
                                    <td className='px-4 py-3'>
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                                            order.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className='px-4 py-3 text-sm'>
                                        <p className='font-medium'>{order.name}</p>
                                        <p className='text-gray-500 text-xs'>{order.email}</p>
                                    </td>
                                    <td className='px-4 py-3 text-sm text-gray-500'>{order.date}</td>
                                    <td className='px-4 py-3'>
                                        <button 
                                            onClick={() => handleDeleteOrder(order.id)}
                                            disabled={deletingOrderId === order.id}
                                            className={`text-white px-3 py-1 rounded text-sm flex items-center gap-2 ${
                                                deletingOrderId === order.id 
                                                    ? 'bg-gray-400 cursor-not-allowed' 
                                                    : 'bg-red-500 hover:bg-red-600'
                                            }`}
                                        >
                                            {deletingOrderId === order.id ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                                    Deleting
                                                </>
                                            ) : (
                                                'Delete'
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Full Page Loading Overlay */}
            {deletingOrderId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
                        <p className="mt-4 text-lg font-semibold text-gray-700">Deleting Order...</p>
                        <p className="text-sm text-gray-500 mt-2">Please wait</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default OrderDetail