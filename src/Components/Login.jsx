import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validateUser } from '../utils/validateUser';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from '../firebase/FirebaseConfig';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
import myContext from '../context/myContext';
import Loading from './Loading';

const Login = () => {
  const context = useContext(myContext);
  const {loading, setLoading} = context;

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: ""
  })

  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async () => {
    const message = validateUser(userLogin.email, userLogin.password);
    setIsLoggingIn(true);
    setLoading(true);
    
    try {
      const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);

      const q = query(
        collection(fireDB, "user"),
        where('uid', '==', users?.user?.uid)
      )

      const data = onSnapshot(q, (QuerySnapshot)=>{
        let user;
        QuerySnapshot.forEach((doc)=> user = doc.data())

        localStorage.setItem("users", JSON.stringify(user));
        setUserLogin({ email: "", password: "" });
        toast.success("Logged In Successfully");

        // Add a small delay to show success message
        setTimeout(() => {
          if(user.role === "user"){
            navigate("/user-dashboard");
          }else{
            navigate("/admin-dashboard");
          }
          setIsLoggingIn(false);
          setLoading(false);
        }, 1000);
      })

      return () => data
        
    } catch (error) {
      console.log(error);
      setError("Invalid Credentials");
      setIsLoggingIn(false);
      setLoading(false);
    }
  }

  if (loading || isLoggingIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-lg font-semibold text-gray-600">
            {isLoggingIn ? "Logging you in..." : "Loading..."}
          </p>
          {isLoggingIn && (
            <p className="mt-2 text-sm text-gray-500">
              Please wait while we authenticate your account
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
        <div className='bg-white p-8 rounded-lg shadow-md border w-full max-w-md'>
            <h1 className='text-3xl font-semibold text-emerald-500 text-center mb-8'>Login</h1>
            
            <div className='space-y-4 mb-6'>
                <input 
                    name='email' 
                    value={userLogin.email} 
                    onChange={(e)=> setUserLogin({...userLogin, email: e.target.value})} 
                    className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500' 
                    type="email" 
                    placeholder='Email Address'
                />
                <input 
                    name='password' 
                    value={userLogin.password} 
                    onChange={(e)=> setUserLogin({...userLogin, password: e.target.value})} 
                    className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500' 
                    type="password" 
                    placeholder='Password'
                />
            </div>
            
            {error && <p className='text-red-500 text-sm mb-4 text-center'>{error}</p>}
            
            <button 
                onClick={handleLogin} 
                disabled={isLoggingIn}
                className={`w-full text-white p-3 rounded-lg font-medium mb-6 flex items-center justify-center gap-2 transition-all ${
                  isLoggingIn 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-emerald-500 hover:bg-emerald-600 cursor-pointer'
                }`}
            >
                {isLoggingIn ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Logging In...
                  </>
                ) : (
                  'Login'
                )}
            </button>
            
            <p className='text-center text-gray-600'>
                Don't have an account? {' '}
                <Link to="/signup" className='text-emerald-500 font-semibold hover:underline'>
                    Sign Up
                </Link>
            </p>
        </div>
    </div>
  )
}

export default Login