import React from 'react'

function VehiclePanel({setVehiclePanel,setConfirmRidePanel}) {
  return (
    <div>
        <div className="flex justify-between">
          <h3 className="text-2xl font-semibold mb-5">Choose a vehicle</h3>
          <div onClick={()=>setVehiclePanel(false)} >
            <h1 className="text-2xl font-semibold relative right-2" >
                <i className="fa-solid fa-arrow-down-long"></i>
            </h1>
          </div>
        </div>
        <div onClick={()=>setConfirmRidePanel(true)} className="flex items-center w-full border-2 active:border-black  rounded-xl p-3 mb-2">
          <img src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" className="h-8"/>
          <div className="ml-2 w-1/2">
            <h4 className="font-medium text-base">Uber Go <span><i className="fa-solid fa-user"></i> 4</span></h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">affordable compact rides</p>
          </div>
          <h2 className="text-xl font-semibold">$193.20</h2>
        </div>
        <div onClick={()=>setConfirmRidePanel(true)} className="flex items-center w-full border-2 active:border-black  rounded-xl p-3 mb-2">
          <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" className="h-10"/>
          <div className="ml-2 w-1/2">
            <h4 className="font-medium text-base">Moto <span><i className="fa-solid fa-user"></i> 1</span></h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">affordable motorcycle rides</p>
          </div>
          <h2 className="text-xl font-semibold">$65.40</h2>
        </div>
        <div onClick={()=>setConfirmRidePanel(true)} className="flex items-center w-full border-2 active:border-black  rounded-xl p-3 mb-2">
          <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" className="h-10"/>
          <div className="ml-2 w-1/2">
            <h4 className="font-medium text-base">Auto <span><i className="fa-solid fa-user"></i> 3</span></h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">affordable auto rides</p>
          </div>
          <h2 className="text-xl font-semibold">$113.20</h2>
        </div>
    </div>
  )
}

export default VehiclePanel