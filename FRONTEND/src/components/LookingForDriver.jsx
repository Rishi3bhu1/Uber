import React from 'react'

function LookingForDriver(props) {
  return (
    <div>
        <div className='flex justify-between'>
            <h2 className='text-2xl font-semibold mb-5'>Looking for a Driver</h2>
            <h1 className="text-2xl font-semibold relative right-2" onClick={()=>props.setVehicleFound(false)} >
                <i className="fa-solid fa-arrow-down-long"></i>
            </h1>
          </div>
        <div className='flex gap-2 flex-col justify-between items-center'>
            <img src='https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg' className='h-20'/>
            <div className='w-full '>
                <div className='flex items-center gap-5 border-b-2 m-2'>
                    <h1 className='text-lg'>
                        <i className="fa-solid fa-location-dot"></i>
                    </h1>
                    <div>
                        <p className='text-sm text-gray-600'>{props.pickup}</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 border-b-2 m-2'>
                    <h1 className='text-lg'>
                        <i className="fa-solid fa-location-dot"></i>
                    </h1>
                    <div>
                        <p className='text-sm text-gray-600'>{props.destination}</p>
                    </div>
                </div>
                <div className='flex items-center gap-4 border-b-2 m-2'>
                    <h1 className='text-lg'>
                        <i className="fa-solid fa-money-bill"></i>
                    </h1>
                    <div>
                        <h3 className='text-lg font-medium'>₹{props.fare[props.vehicleType]}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LookingForDriver