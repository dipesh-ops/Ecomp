import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { fireDB } from "../firebase/FirebaseConfig"
import { useNavigate } from 'react-router-dom';

const categoryList = [
    { name: 'fashion' },
    { name: 'shirt' },
    { name: 'jacket' },
    { name: 'mobile' },
    { name: 'laptop' },
    { name: 'shoes' },
    { name: 'home' },
    { name: 'electronics' },
    { name: 'books' }
]

const AddProduct = () => {
    const navigate = useNavigate();
    const [base64, setBase64] = useState('');
    const [loading, setLoading] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setBase64(reader.result);
        };
        reader.readAsDataURL(file);
    }

    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImage: "",
        category: "",
        description: "",
        discount: "",
        quantity: 1,
        time: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric"
        })
    })

    const addProductToDB = async () => {
        if (product.title === "" || product.price === "" || !base64 || product.category === "" || product.description === "") {
            return toast.error("Please Fill All The Fields");
        }

        setLoading(true);
        try {
            const productRef = collection(fireDB, "product");
            await addDoc(productRef, {
                ...product,
                productImage: base64
            });
            toast.success("Product Added Successfully");
            navigate("/admin-dashboard");
        } catch (error) {
            console.log(error);
            toast.error("Error while adding the product");
        }
        setLoading(false);
    }

    return (
        <div className='min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8'>
            <div className='bg-white w-full max-w-md sm:max-w-lg lg:max-w-2xl rounded-lg shadow-sm border p-4 sm:p-6 lg:p-8'>
                <h1 className='text-emerald-500 font-semibold text-xl sm:text-2xl text-center mb-6'>Add Product</h1>
                
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6'>
                    {/* Left Column */}
                    <div className='space-y-4'>
                        <input 
                            type="text" 
                            name="title"
                            value={product.title} 
                            onChange={(e) => setProduct({...product, title: e.target.value})} 
                            placeholder='Product Title' 
                            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent'
                        />

                        <input 
                            type="number"
                            name="price"
                            value={product.price} 
                            onChange={(e) => setProduct({...product, price: e.target.value})}
                            placeholder='Product Price' 
                            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent'
                        />

                        <input 
                            type="number"
                            name="discount"
                            value={product.discount} 
                            onChange={(e) => setProduct({...product, discount: e.target.value})}
                            placeholder='Discount Amount' 
                            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent'
                        />

                        <select
                            name="category"
                            value={product.category} 
                            onChange={(e) => setProduct({...product, category: e.target.value})} 
                            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white'
                        >
                            <option value="" disabled>Select Category</option>
                            {categoryList.map((value, index) => (
                                <option key={index} value={value.name} className='capitalize'>
                                    {value.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Right Column */}
                    <div className='space-y-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Product Image
                            </label>
                            <input
                                type='file'
                                accept="image/*" 
                                onChange={handleImageChange}
                                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100'
                            />
                            {base64 && (
                                <div className='mt-3'>
                                    <img 
                                        src={base64} 
                                        alt="Preview" 
                                        className='w-20 h-20 object-cover rounded border'
                                    />
                                </div>
                            )}
                        </div>

                        <textarea 
                            rows={4}
                            name="description"
                            value={product.description} 
                            onChange={(e) => setProduct({...product, description: e.target.value})} 
                            placeholder='Product Description' 
                            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none'
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className='mt-6 sm:mt-8'>
                    <button 
                        onClick={addProductToDB}
                        disabled={loading}
                        className={`w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 ${
                            loading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-emerald-500 hover:bg-emerald-600 cursor-pointer'
                        }`}
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Adding Product...
                            </>
                        ) : (
                            'Add Product'
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddProduct