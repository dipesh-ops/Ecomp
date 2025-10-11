import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { validateUser } from '../utils/validateUser'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, fireDB } from '../firebase/FirebaseConfig'
import { addDoc, collection } from 'firebase/firestore'
import myContext from '../context/myContext'
import Loading from './Loading'

const SignUp = () => {
    const context = useContext(myContext);
    const {loading, setLoading} = context;
    const navigate = useNavigate();

    const [userDetail, setUserDetail] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    })

    const [isSigningUp, setIsSigningUp] = useState(false);

    const signUpUser = async () => {
        setIsSigningUp(true);
        setLoading(true);

        if(userDetail.name === "" || userDetail.email === "" || userDetail.password === ""){
            toast.error("Please Fill All The Fields");
            setIsSigningUp(false);
            setLoading(false);
            return;
        }

        const message = validateUser(userDetail.email, userDetail.password);

        try {
            const users = await createUserWithEmailAndPassword(auth, userDetail.email, userDetail.password);

            const user = {
                name: userDetail.name,
                email: users.user.email,
                uid: users.user.uid,
                role: userDetail.role,
                date: new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric"
                }),
                time: new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                })
            }

            const userReference = collection(fireDB, 'user');
            await addDoc(userReference, user);

            setUserDetail({
                name: "",
                email: "",
                password: "",
                role: "user"
            });

            toast.success("User Created Successfully");
            
            // Add a small delay to show success message
            setTimeout(() => {
                navigate("/login");
                setIsSigningUp(false);
                setLoading(false);
            }, 1000);
            
        } catch(error) {
            console.log(error);
            toast.error("Error creating user");
            setIsSigningUp(false);
            setLoading(false);
        }
    }

    if (loading || isSigningUp) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto"></div>
                    <p className="mt-4 text-lg font-semibold text-gray-600">
                        {isSigningUp ? "Creating your account..." : "Loading..."}
                    </p>
                    {isSigningUp && (
                        <p className="mt-2 text-sm text-gray-500">
                            Please wait while we set up your account
                        </p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen flex items-center justify-center p-4'>
            <div className='bg-white p-8 rounded-lg shadow-md border w-full max-w-md'>
                <h1 className='text-3xl font-semibold text-emerald-500 text-center mb-8'>Sign Up</h1>
                
                <div className='space-y-4 mb-6'>
                    <input 
                        name='name' 
                        value={userDetail.name} 
                        onChange={(e) => setUserDetail({...userDetail, name: e.target.value})}
                        className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500'
                        type="text" 
                        placeholder='Full Name'
                    />
                    <input
                        name='email' 
                        value={userDetail.email} 
                        onChange={(e) => setUserDetail({...userDetail, email: e.target.value})}
                        className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500'
                        type="email" 
                        placeholder='Email Address'
                    />
                    <input 
                        name='password' 
                        value={userDetail.password} 
                        onChange={(e) => setUserDetail({...userDetail, password: e.target.value})}
                        className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500'
                        type="password" 
                        placeholder='Password'
                    />
                </div>
                
                <button 
                    onClick={signUpUser} 
                    disabled={isSigningUp}
                    className={`w-full text-white p-3 rounded-lg font-medium mb-6 flex items-center justify-center gap-2 transition-all ${
                        isSigningUp 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-emerald-500 hover:bg-emerald-600 cursor-pointer'
                    }`}
                >
                    {isSigningUp ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Creating Account...
                        </>
                    ) : (
                        'Sign Up'
                    )}
                </button>
                
                <p className='text-center text-gray-600'>
                    Already have an account? {' '}
                    <Link to="/login" className='text-emerald-500 font-semibold hover:underline'>
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp