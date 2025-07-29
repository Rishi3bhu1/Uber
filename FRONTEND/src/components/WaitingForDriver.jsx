import React from 'react'

function WaitingForDriver(props) {
  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0' >
        <i className="text-3xl text-gray-200 fa-solid fa-angle-down" onClick={()=>props.setWaitingForDriver(false)}></i>
      </h5>
      <div className='flex justify-between items-center'> 
        <img src='https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg' className='h-12'/>
        <div className='text-right'>
          <h2 className='text-lg font-md'>{props.ride?.captain.fullname.firstname+" "+props.ride?.captain.fullname.lastname}</h2> 
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain.vehicle.plate}</h4>
          <p className='text-sm text-gray-600'>Maruti Suzuki</p>
        </div>
      </div>
      <div className='flex gap-2 flex-col justify-between items-center'>
        <div className='w-full '>
            <div className='flex items-center gap-5 border-b-2 m-2'>
                <h1 className='text-lg'>
                    <i className="fa-solid fa-location-dot"></i>
                </h1>
                <div>
                    <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-sm text-gray-600'>{props.ride?.pickup}</p>
                </div>
            </div>
            <div className='flex items-center gap-5 border-b-2 m-2'>
                <h1 className='text-lg'>
                    <i className="fa-solid fa-location-dot"></i>
                </h1>
                <div>
                    <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-sm text-gray-600'>{props.ride?.destination}</p>
                </div>
            </div>
            <div className='flex items-center gap-4 border-b-2 m-2'>
                <h1 className='text-lg'>
                    <i className="fa-solid fa-money-bill"></i>
                </h1>
                <div>
                    <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                    <p className='text-sm text-gray-600'>Cash Cash</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver