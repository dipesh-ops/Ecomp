import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/FirebaseConfig'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { closeMenu, toggle } from '../Redux/toggleSlice'
import HamburgerMenu from './HamburgerMenu'

const navLinks = [
  {
    name: 'Home',
    link: '#',
    path : '/'
  },
  {
    name : "All Proudcts",
    link : '#products',
    path : '/products'
  }
]

const Navbar = () => {

  const cartItems = useSelector((state)=> state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getMenu = useSelector((state)=> state.toggleMenu.toggleMenu);

  const handleToggleMenu = () => dispatch(toggle());

  const handleCloseMenu = () => dispatch(closeMenu());

  const signingOut = () =>{
    signOut(auth).then(()=>{
      toast.success("Logged Out Successfully")
      localStorage.clear();
      navigate("/");
    }).catch((error)=>{
      toast.error("Error While Logging Out");
    })
  }

  const user = JSON.parse(localStorage.getItem("users"));

  useEffect(()=>{
    dispatch(closeMenu());
  }, [])

  return (
    <div className='w-full mt-5 flex justify-between px-10 p-4 bg-white!'>
      <div className='text-2xl font-bold text-gray-600'>
        <Link to="/">
          <i className="ri-rounded-corner text-emerald-500"> </i>
        ECOM
        </Link>
      </div>

      <div className='flex md:hidden'>
        {getMenu ? <i onClick={handleCloseMenu} className="ri-close-line"></i> : <i onClick={handleToggleMenu} className="ri-menu-3-line"></i>}
      </div>

      {
        getMenu && <HamburgerMenu/>
      }

      <div className='hidden md:flex text-2xl text-gray-600'>
        {
          navLinks.map((item, index)=>{
            return(
              <Link to={item.path} key={index} className='cursor-pointer text-xl! font-semibold mr-4'>{item.name}</Link>
            )
          })
        }

        {user && user.role === "user" &&
          cartItems && <Link to='/cart' className='text-xl font-semibold cursor-pointer mr-4'> <i className="ri-shopping-cart-fill"></i> <small>({cartItems.length})</small>
         </Link>
        }
        <Link to="/login">
          {!user && <i className="ri-user-heart-fill mr-4"></i>}
        </Link>

        {user && user.role === "admin" && <Link to={'/admin-dashboard'} className='font-semibold text-xl mr-4'>Admin Dashboard</Link>}
        {user && user.role === "user" && <Link to={'/user-dashboard'} className='font-semibold text-xl mr-4'>{user.name}</Link>}
        <Link>
          {
            user && <h1 className='text-xl font-semibold mr-4' onClick={signingOut}>LogOut</h1>
          }
        </Link>
      </div>
    </div>
  )
}

export default Navbar