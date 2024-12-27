import React from 'react'
import {Link} from 'react-router-dom'
function Start() {
  return (
    <div>
        <div className=' bg-cover bg-center bg-[url(https://images.pexels.com/photos/2422270/pexels-photo-2422270.jpeg?auto=compress&cs=tinysrgb&w=600)] h-screen pt-5  flex justify-between flex-col w-full '>
            <img className='w-16 ml-8' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'/>
            <div className='bg-white py-5 px-4'>
                <h2 className='text-2xl font-bold'>Get started with Uber</h2>
                <Link to='/user/login' className=' flex justify-center w-full bg-black text-white py-3 rounded mt-4'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Start