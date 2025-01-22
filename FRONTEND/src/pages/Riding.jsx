import React from 'react'
import {Link} from 'react-router-dom'
function Riding() {
  return (
    <div className='h-screen'>
        <Link className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full' to='/user/home'>
            <i className="fa-solid fa-house text-lg font-semibold"></i>
        </Link>
        <div className='h-1/2'>
            <img className="h-full w-full object-cover object-center" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"/>
        </div>
        <div className='h-1/2 p-4 '>
            <div className='flex justify-between items-center'> 
                <img src='https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg' className='h-12'/>
                <div className='text-right mr-2'>
                    <h2 className='text-lg font-md'>Rishi</h2>
                    <h4 className='text-xl font-semibold -mt-1 -mb-1'>Something</h4>
                    <p className='text-sm text-gray-600'>Maruti suzuki alto</p>
                </div>
            </div>
            <div className='flex gap-2 flex-col justify-between items-center flex-grow'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 border-b-2 m-2'>
                        <h1 className='text-lg'>
                            <i className="fa-solid fa-location-dot"></i>
                        </h1>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm text-gray-600'>Kankariya Talab,Ahemdabad</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 border-b-2 m-2'>
                        <h1 className='text-lg'>
                            <i className="fa-solid fa-money-bill"></i>
                        </h1>
                        <div>
                            <h3 className='text-lg font-medium'>$193.20</h3>
                            <p className='text-sm text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
            </div>    
            <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make A Payment</button>
        </div>
    </div>
  )
}

export default Riding