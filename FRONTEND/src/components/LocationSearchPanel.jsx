import React from 'react'

function LocationSearchPanel({setExpand,setVehiclePanel}) {
    const locations = ['5396 North Reese Avenue, Fresno CA 93722','5440 North Reese Avenue, Fresno CA 93722','5600 North Reese Avenue, Fresno CA 93722'];
    const handleVehiclePanel=()=>{
      setVehiclePanel(true)
      setExpand(false)
    }
  return (
    <div>
        {/*This is smaple data*/}
        {
            locations.map((elem,index)=>(
            <div className='flex items-center justify-start gap-4' key={index} onClick={handleVehiclePanel}>
                <h2 className='p-2 bg-[#eee] flex  rounded-full my-4 items-center justify-center'><i className="fa-solid fa-map-pin p-2"></i></h2>
                <h4>{elem}</h4>
            </div>
            ))
        }
    </div>
  )
}

export default LocationSearchPanel