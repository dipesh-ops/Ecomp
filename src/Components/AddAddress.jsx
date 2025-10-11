import React, { useState } from 'react'
import image from "../assets/vector1.png"
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';
import { useNavigate } from 'react-router-dom';

const AddAddress = () => {
    const user = JSON.parse(localStorage.getItem("users"));
    const navigate = useNavigate();

    const [userDetail, setUserDetail] = useState({
        name: "",
        phone: "",
        pincode: "",
        address: "",
        city: "",
        state: "",
        userId: user?.uid        
    })

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(userDetail.name === "" || userDetail.phone === "" || userDetail.pincode === "" || userDetail.address === "" || userDetail.city === "" || userDetail.state === ""){
            toast.error("Please fill all the fields")
            return;
        }

        setLoading(true);
        try {
            const addressRef = collection(fireDB, 'address');
            await addDoc(addressRef, userDetail);
            toast.success("Address added successfully");
            navigate("/cart");
        } catch (error) {
            console.log(error);
            toast.error("Failed to add address");
        }
        setLoading(false);
    }

    return (
        <div className='mx-4 sm:mx-6 lg:mx-8 my-6 lg:my-8'>
            <div className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
                {/* Left Section - Form */}
                <div className="w-full lg:w-[40%] xl:w-[30%]">
                    <div className='bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm border'>
                        <h1 className='text-xl sm:text-2xl lg:text-3xl font-medium'>Add Shipping <span className='font-semibold text-emerald-500'>Address</span></h1>
                        
                        <form onSubmit={handleSubmit} className='mt-4 sm:mt-6'>
                            <div className='flex flex-col gap-3 sm:gap-4'>
                                <input 
                                    name='name' 
                                    value={userDetail.name} 
                                    onChange={(e)=> setUserDetail({...userDetail, name: e.target.value})}
                                    className='p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
                                    type="text" 
                                    placeholder='Full name'
                                />
                                <input 
                                    name='phone' 
                                    value={userDetail.phone} 
                                    onChange={(e)=> setUserDetail({...userDetail, phone: e.target.value})}
                                    className='p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
                                    type="number" 
                                    placeholder='Phone number'
                                />
                                <input 
                                    name='pincode' 
                                    value={userDetail.pincode} 
                                    onChange={(e)=> setUserDetail({...userDetail, pincode: e.target.value})}
                                    className='p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
                                    type="number" 
                                    placeholder='Pincode'
                                />
                                <textarea 
                                    name='address' 
                                    value={userDetail.address} 
                                    onChange={(e)=> setUserDetail({...userDetail, address: e.target.value})}
                                    className='p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none'
                                    placeholder='Address (Area and Street)'
                                    rows="3"
                                />
                            </div>
                            
                            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 mt-3 sm:mt-4'>
                                <input 
                                    name='city' 
                                    value={userDetail.city} 
                                    onChange={(e)=> setUserDetail({...userDetail, city: e.target.value})}
                                    className='p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all flex-1'
                                    type="text" 
                                    placeholder='City/District/Town'
                                />
                                <input 
                                    name='state' 
                                    value={userDetail.state} 
                                    onChange={(e)=> setUserDetail({...userDetail, state: e.target.value})}
                                    className='p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all flex-1'
                                    type="text" 
                                    placeholder='State'
                                />
                            </div>
                            
                            <button 
                                type="submit"
                                disabled={loading}
                                className={`w-full mt-4 sm:mt-6 p-3 rounded-lg text-white font-semibold transition-all flex items-center justify-center gap-2 ${
                                    loading 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-emerald-500 hover:bg-emerald-600 cursor-pointer'
                                }`}
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        Adding Address...
                                    </>
                                ) : (
                                    'Add Address'
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Section - Image */}
                <div className="w-full lg:w-[60%] xl:w-[70%] flex justify-center items-center">
                    <img 
                        className='w-full max-w-md lg:max-w-lg xl:max-w-xl rounded-lg' 
                        src={image} 
                        alt="Address illustration" 
                    />
                </div>
            </div>
        </div>
    )
}

export default AddAddress