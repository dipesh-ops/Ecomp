import React from 'react'
import LoadingGif from "../assets/Loading1.gif";

const Loading = () => {
  return (
    <div className='w-full h-[100vh] flex justify-center'>
        <img className='w-50 h-50 mt-[23vh]' src={LoadingGif} alt="No Image" />
    </div>
  )
}

export default Loading