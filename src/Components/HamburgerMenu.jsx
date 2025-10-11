import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeMenu } from '../Redux/toggleSlice';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/FirebaseConfig';
import { toast } from 'react-toastify';

const HamburgerMenu = () => {
    const user = JSON.parse(localStorage.getItem("users"));
    const navigate = useNavigate();
    const getMenu = useSelector((state)=> state.toggleMenu);
    
    const dispatch = useDispatch();

    const signingOut = async () =>{
      signOut(auth).then(()=>{
        toast.success("Sign Out Successfully");
        navigate('/');
        localStorage.clear();
      }).catch((error)=>{
        console.log(error);        
      })
    }
    
  return (
    <div className='fixed inset-0 z-50 md:hidden'>
        {/* Backdrop */}
        {getMenu && (
            <div 
                className='absolute inset-0 bg-black bg-opacity-50'
                onClick={() => dispatch(closeMenu())}
            />
        )}
        
        {/* Menu */}
        <div className={`absolute top-0 left-0 h-full w-80 max-w-full bg-white shadow-lg transform transition-transform duration-300 ${
            getMenu ? 'translate-x-0' : '-translate-x-full'
        }`}>
            {getMenu && (
                <div className='flex flex-col h-full'>
                    {/* Menu Header */}
                    <div className='bg-emerald-500 text-white p-4'>
                        <div className='flex justify-between items-center'>
                            <h2 className='text-xl font-bold'>Menu</h2>
                            <button 
                                onClick={() => dispatch(closeMenu())}
                                className='p-2 hover:bg-emerald-600 rounded-full transition-colors'
                            >
                                <i className="ri-close-line ri-lg"></i>
                            </button>
                        </div>
                        {user && (
                            <p className='text-sm mt-2 opacity-90'>
                                Welcome, {user.name || user.email}
                            </p>
                        )}
                    </div>

                    {/* Menu Items */}
                    <ul className='flex-1 p-4 flex flex-col space-y-3 overflow-y-auto'>
                        <Link 
                            to="/" 
                            className='flex items-center p-3 text-gray-700 rounded hover:bg-gray-100 transition-colors'
                            onClick={() => dispatch(closeMenu())}
                        >
                            <i className="ri-home-3-line mr-3 ri-lg"></i>
                            Home 
                        </Link>
                        <Link 
                            to="/products" 
                            className='flex items-center p-3 text-gray-700 rounded hover:bg-gray-100 transition-colors'
                            onClick={() => dispatch(closeMenu())}
                        >
                            <i className="ri-shopping-bag-line mr-3 ri-lg"></i>
                            All Products 
                        </Link>
                        {user && user.role === "admin" && (
                            <Link 
                                to="/admin-dashboard" 
                                className='flex items-center p-3 text-gray-700 rounded hover:bg-gray-100 transition-colors'
                                onClick={() => dispatch(closeMenu())}
                            >
                                <i className="ri-dashboard-line mr-3 ri-lg"></i>
                                Admin Dashboard 
                            </Link>
                        )}

                        {user && user.role === "user" && (
                            <Link 
                                to="/user-dashboard" 
                                className='flex items-center p-3 text-gray-700 rounded hover:bg-gray-100 transition-colors'
                                onClick={() => dispatch(closeMenu())}
                            >
                                <i className="ri-user-line mr-3 ri-lg"></i>
                                User Dashboard 
                            </Link> 
                        )}
                        {user && user.role === "user" && <Link 
                            to="/cart" 
                            className='flex items-center p-3 text-gray-700 rounded hover:bg-gray-100 transition-colors'
                            onClick={() => dispatch(closeMenu())}
                        >
                            <i className="ri-shopping-cart-line mr-3 ri-lg"></i>
                            Cart 
                        </Link>}
                        
                        {/* Authentication Section */}
                        <div className="border-t border-gray-200 pt-3 mt-3">
                            {user && (
                                <button 
                                    className='flex items-center p-3 text-red-500 rounded w-full'
                                    onClick={() => {
                                        signingOut();
                                        dispatch(closeMenu());
                                    }}
                                >
                                    <i className="ri-logout-box-r-line mr-3 ri-lg"></i>
                                    LogOut
                                </button>
                            )}
                            {!user && (
                                <Link 
                                    to="/login" 
                                    className='flex items-center p-3 text-gray-700 rounded hover:bg-gray-100 transition-colors'
                                    onClick={() => dispatch(closeMenu())}
                                >
                                    <i className="ri-login-box-line mr-3 ri-lg"></i>
                                    Login
                                </Link>
                            )}
                        </div>
                    </ul>
                </div>
            )}
        </div>
    </div>
  )
}

export default HamburgerMenu