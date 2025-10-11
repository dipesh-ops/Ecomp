import { doc, getDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { fireDB } from '../firebase/FirebaseConfig';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../Redux/cartSlice';
import { toast } from 'react-toastify';
import myContext from '../context/myContext';
import Loading from './Loading';

const ProductInfo = () => {
  const {id} = useParams();
  const context = useContext(myContext);
  const {loading, setLoading} = context;
  const [product, setProduct] = useState([]);

  const dispatch = useDispatch();
  const cartItems = useSelector((state)=> state.cart);

  const getSingleProduct = async () =>{
    setLoading(true);
    try {
      const productTemp= await getDoc(doc(fireDB, "product", id));
      setProduct({...productTemp.data(), id : productTemp.id})
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const addToCartFunction = (item) =>{
    dispatch(addToCart(item));
    toast.success("Added To Cart");
  }

  const deleteCart = (item) =>{
    dispatch(deleteFromCart(item));
    toast.success("Deleted From Cart")
  }

  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(()=>{
    getSingleProduct();
  },[])

  return loading ? <Loading/> : (
    <div className='mx-4 sm:mx-6 lg:mx-8 mt-6 lg:mt-8 bg-white p-4 sm:p-6 lg:p-8 rounded-lg'>
       <div className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
            {/* Product Images */}
            <div className='w-full lg:w-1/2 flex flex-col items-center'>
                <img className='w-full max-w-sm sm:max-w-md lg:max-w-sm' src={product.productImage} alt="No Image" />
                <div className='flex gap-2 sm:gap-4 mt-4'>
                    <img className='w-16 sm:w-20 lg:w-24 rounded border' src={product.productImage} alt="" />
                    <img className='w-16 sm:w-20 lg:w-24 rounded border' src={product.productImage} alt="" />
                    <img className='w-16 sm:w-20 lg:w-24 rounded border' src={product.productImage} alt="" />
                    <img className='w-16 sm:w-20 lg:w-24 rounded border' src={product.productImage} alt="" />
                </div>
            </div>

            {/* Product Details */}
            <div className='w-full lg:w-1/2'>
                <h1 className='font-semibold text-xl sm:text-2xl lg:text-3xl'>{product.title}</h1>
                <p className='mt-4 text-gray-600 text-sm sm:text-base'>{product.description}</p>
                <p className='font-semibold text-xl sm:text-2xl lg:text-3xl mt-4 text-emerald-600'>${product.price}</p>
                
                <div className='mt-6'>
                  {cartItems.some((p)=> p.id === product.id) ? 
                    <button onClick={()=> deleteCart(product)} className='bg-orange-500 px-6 py-3 w-full sm:w-1/2 lg:w-1/3 rounded-lg text-white hover:bg-orange-600 cursor-pointer'>
                      Remove From Cart
                    </button> : 
                    <button onClick={()=> addToCartFunction(product)} className='bg-emerald-500 px-6 py-3 w-full sm:w-1/2 lg:w-1/3 rounded-lg text-white hover:bg-emerald-600 cursor-pointer'>
                      Add to Cart
                    </button> 
                  }
                </div>
            </div>
       </div>
    </div>
  )
}

export default ProductInfo  