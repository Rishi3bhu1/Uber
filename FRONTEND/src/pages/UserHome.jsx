import { useRef, useState } from "react"
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import { use } from "react";
import WaitingForDriver from "../components/WaitingForDriver";

function UserHome() {
  const [pick,setPick] = useState('');
  const [drop,setDrop] = useState('');  
  const [expand,setExpand] = useState(false);
  const expandRef = useRef(null);
  const closeExpandRef = useRef(null);
  const vehiclePanelRef = useRef(null)
  const closeVehiclePanel = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const closeConfirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [waitingForDriver,setWaitingForDriver] = useState(false)
  const [vehicleFound,setVehicleFound] = useState(false)
  const [vehiclePanel,setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  useGSAP(()=>{
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current,{
        transform:'translateY(0)'
      })
    }
    else{
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      });
    }
  },[confirmRidePanel])
  useGSAP(()=>{
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current,{
        transform:'translateY(0)'
      })
    }
    else{
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      });
    }
  },[vehiclePanel])
  useGSAP(()=>{
    if(expand){
      gsap.to(expandRef.current,{
        height:'70%',
        padding:5,
        duration:0.5
      })
      gsap.to(closeExpandRef.current,{
        opacity:1
      })
    }else{
      gsap.to(expandRef.current,{
        height:'0%',
        padding:0,
        duration:0.5
      })
      gsap.to(closeExpandRef.current,{
        opacity:0
      })
    }
  },[expand])
  useGSAP(()=>{
    if(vehicleFound){
      gsap.to(vehicleFoundRef.current,{
        transform:'translateY(0)'
      })
    }
    else{
      gsap.to(vehicleFoundRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[vehicleFound])
  useGSAP(()=>{
    if(waitingForDriver){
      gsap.to(waitingForDriverRef.current,{
        transform:'translateY(0)'
      })
    }
    else{
      gsap.to(waitingForDriverRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[waitingForDriver])
  const toggleScreen = () => {
    expand?setExpand(true):setExpand(true)
  }
  const submitHandler = (e) => {
    e.preventDefault()
    console.log("drop :",drop,"pick :",pick)
    setDrop('');
    setPick('');
  }
  return (
    <div className="h-full relative overflow-hidden" >
      <img  className='absolute left-5 top-2 w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"/>
      <div className="h-screen w-screen">
        <img className="h-full w-full object-cover object-center" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"/>
      </div>
      <div className=" flex flex-col top-0 justify-end h-screen absolute w-full"
      >
        <div className="bg-white h-[30%] p-5 relative" >
          <div className="absolute top-6 right-6 cursor-pointer" onClick={()=>setExpand(false)}>
            <h1 className="text-2xl font-semibold" ref={closeExpandRef}>
            <i className="fa-solid fa-arrow-down-long"></i>
            </h1>
          </div>
          <h1 className="text-2xl font-semibold">Find a trip</h1>
          <form onSubmit={(e)=>submitHandler(e)}>
            <input className='bg-[#eee] px-8 py-2 text-base w-full rounded-lg mt-5' type="text" placeholder="Add a Pick-up Location"
            value={pick}
            onChange={(e)=>setPick(e.target.value)}
            onClick={toggleScreen}
            />
            <input className='bg-[#eee] px-8 py-2 text-base rounded-lg mt-3 w-full ' type="text" placeholder="Enter your destination"
            value={drop}
            onClick={toggleScreen}
            onChange={(e)=>setDrop(e.target.value)}
            />
            <button className='bg-black text-white w-full py-2 rounded-lg mt-3'>Search</button>
          </form>
        </div>
        <div ref={expandRef} className="h-[0%] bg-white"> 
          <LocationSearchPanel setExpand={setExpand} setVehiclePanel={setVehiclePanel} />
        </div>
      </div>
      <div className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-5" ref={vehiclePanelRef}>
        <VehiclePanel 
        setVehiclePanel={setVehiclePanel}  
        setConfirmRidePanel={setConfirmRidePanel}/>
      </div>
      <div className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-5" ref={confirmRidePanelRef} >
        <ConfirmRide 
        setConfirmRidePanel={setConfirmRidePanel}  
        setVehicleFound={setVehicleFound} 
        />
      </div>
      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-5'>
        <LookingForDriver
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div  className='fixed w-full z-10 bottom-0  bg-white px-3 py-6 pt-5' ref={waitingForDriverRef}>
        <WaitingForDriver
          waitingForDriver={waitingForDriver}
        />
      </div>
    </div>
  )
}

export default UserHome