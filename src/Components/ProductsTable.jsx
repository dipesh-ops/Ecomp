import React, { useContext, useState } from 'react'
import myContext from '../context/myContext';
import { Link } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';
import { toast } from 'react-toastify';

const ProductsTable = () => {
    
  const context = useContext(myContext);
  const {getAllProducts, getAllProductFunction} = context

  const [deletingProductId, setDeletingProductId] = useState(null);

  const deleteProduct = async (id) =>{
    setDeletingProductId(id);
    try {
        await deleteDoc(doc(fireDB, "product", id));
        await getAllProductFunction();
        toast.success("Product deleted successfully");
    } catch (error) {
        console.log(error);
        toast.error("Failed to delete product");
    } finally {
        setDeletingProductId(null);
    }
  }

  return (
    <div className='mb-5'>
        <div className='flex justify-between items-center mb-4'>
            <h1 className='font-semibold text-xl'>All Products</h1>
            <Link to="/addProduct" className='bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium'>
                Add Product
            </Link>
        </div>

        {/* Mobile View */}
        <div className='block lg:hidden space-y-4'>
            {getAllProducts.map((item, index) => (
                <div key={index} className='bg-white p-4 rounded-lg border'>
                    <div className='flex gap-4'>
                        <img className='w-20 h-20 object-cover rounded' src={item.productImage} alt={item.title} />
                        <div className='flex-grow'>
                            <h3 className='font-semibold text-sm line-clamp-2'>{item.title}</h3>
                            <p className='text-emerald-600 font-bold mt-1'>${item.price}</p>
                            <p className='text-gray-500 text-xs mt-1'>{item.category}</p>
                            <p className='text-gray-400 text-xs mt-1'>{item.date}</p>
                        </div>
                    </div>
                    <div className='flex gap-2 mt-3'>
                        <Link 
                            to={`/update/${item.id}`}
                            className='flex-1 bg-blue-500 text-white py-2 text-center rounded text-sm hover:bg-blue-600'
                        >
                            Edit
                        </Link>
                        <button 
                            onClick={() => deleteProduct(item.id)}
                            disabled={deletingProductId === item.id}
                            className={`flex-1 text-white py-2 rounded text-sm flex items-center justify-center gap-2 ${
                                deletingProductId === item.id 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-red-500 hover:bg-red-600'
                            }`}
                        >
                            {deletingProductId === item.id ? (
                                <>
                                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                    Deleting...
                                </>
                            ) : (
                                'Delete'
                            )}
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {/* Desktop View */}
        <div className='hidden lg:block overflow-x-auto bg-white rounded-lg border'>
            <table className='w-full'>
                <thead className='bg-gray-50'>
                    <tr>
                        <th className='px-4 py-3 text-left text-sm font-semibold'>S.No.</th>
                        <th className='px-4 py-3 text-left text-sm font-semibold'>Title</th>
                        <th className='px-4 py-3 text-left text-sm font-semibold'>Image</th>
                        <th className='px-4 py-3 text-left text-sm font-semibold'>Price</th>
                        <th className='px-4 py-3 text-left text-sm font-semibold'>Category</th>
                        <th className='px-4 py-3 text-left text-sm font-semibold'>Date</th>
                        <th className='px-4 py-3 text-left text-sm font-semibold'>Actions</th>
                    </tr>
                </thead>
                <tbody className='divide-y'>
                    {getAllProducts.map((item, index) => (
                        <tr key={index} className='hover:bg-gray-50'>
                            <td className='px-4 py-3 text-sm'>{index + 1}</td>
                            <td className='px-4 py-3 text-sm font-medium'>{item.title}</td>
                            <td className='px-4 py-3'>
                                <img className='w-12 h-12 object-cover rounded' src={item.productImage} alt={item.title} />
                            </td>
                            <td className='px-4 py-3 text-sm font-semibold text-emerald-600'>${item.price}</td>
                            <td className='px-4 py-3 text-sm text-gray-600'>{item.category}</td>
                            <td className='px-4 py-3 text-sm text-gray-500'>{item.date}</td>
                            <td className='px-4 py-3'>
                                <div className='flex gap-2'>
                                    <Link 
                                        to={`/update/${item.id}`}
                                        className='bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600'
                                    >
                                        Edit
                                    </Link>
                                    <button 
                                        onClick={() => deleteProduct(item.id)}
                                        disabled={deletingProductId === item.id}
                                        className={`text-white px-3 py-1 rounded text-sm flex items-center gap-2 ${
                                            deletingProductId === item.id 
                                                ? 'bg-gray-400 cursor-not-allowed' 
                                                : 'bg-red-500 hover:bg-red-600'
                                        }`}
                                    >
                                        {deletingProductId === item.id ? (
                                            <>
                                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                                Deleting
                                            </>
                                        ) : (
                                            'Delete'
                                        )}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Full Page Loading Overlay */}
        {deletingProductId && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
                    <p className="mt-4 text-lg font-semibold text-gray-700">Deleting Product...</p>
                    <p className="text-sm text-gray-500 mt-2">Please wait</p>
                </div>
            </div>
        )}
    </div>
  )
}

export default ProductsTable