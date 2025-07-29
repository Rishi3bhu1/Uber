import { useEffect, useRef, useState } from "react"
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LocationSearchPanel from "../components/LocationSearchPanel.jsx";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import { use } from "react";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";
import {SocketContext} from "../context/SocketContext.jsx"
import { useContext} from "react";
import { UserDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router";
function UserHome() {
  const [pick,setPick] = useState('');
  const [drop,setDrop] = useState('');  
  const [expand,setExpand] = useState(false);
  const expandRef = useRef(null);
  const closeExpandRef = useRef(null);
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [waitingForDriver,setWaitingForDriver] = useState(false)
  const [vehicleFound,setVehicleFound] = useState(false)
  const [vehiclePanel,setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [destination, setDestination] = useState('');
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [vehicleType,setVehicleType] = useState('')
  const [pickup, setPickup] = useState('');
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [ activeField, setActiveField ] = useState('')
  const [fare, setFare] = useState({});
  const {socket} = useContext(SocketContext);
  const {user} = useContext(UserDataContext)
  const [ride,setRide] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(user)
    socket.emit("join",{ userId:user._id, userType:"user"})
  }, [user])
  socket.on('ride-confirmed',(ride)=>{
    setVehicleFound(false)
    setWaitingForDriver(true)
    setRide(ride)
  })
  socket.on("ride-started",ride=>{
    console.log("ride");
    setWaitingForDriver(false);
    navigate('/user/riding',{state:{ride}})
  })
  const handlePickupChange = async(e)=>{
    setPickup(e.target.value);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,{
        params:{
          input:e.target.value
        },
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      setPickupSuggestions(response.data);
    } catch (error) {
      console.log(error)
    }
  }
  const handleDestinationChange = async(e)=>{
    setDestination(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,{
        params:{
          input:e.target.value
        },
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      setDestinationSuggestions(response.data);
    } catch (error) {
      console.log(error)
    }
  }
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
        transform:'translateY(0%)'
      })
    }
    else{
      gsap.to(waitingForDriverRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[waitingForDriver])
  async function findTrip(){
    setVehiclePanel(true);
    setExpand(false);
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`,{
      params:{pickup,destination},
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    setFare(response.data)
  }
  async function createRide(vehicleType){
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,{
      pickup,
      destination,
      vehicleType
    },{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log(response.data)
  }
  const toggleScreen = () => {
    expand?setExpand(true):setExpand(true)
  }
  const submitHandler = (e) => {
    e.preventDefault()
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
            value={pickup}
            onClick={()=>{
              toggleScreen()
              setActiveField('pickup')}
            }
            onChange={handlePickupChange}
            />
            <input className='bg-[#eee] px-8 py-2 text-base rounded-lg mt-3 w-full ' type="text" placeholder="Enter your destination"
            value={destination}
            onClick={()=>{
              toggleScreen()
              setActiveField('destination')}
            }
            onChange={handleDestinationChange}
            />
            <button className='bg-black text-white w-full py-2 rounded-lg mt-3' onClick={findTrip}>Search</button>
          </form>
        </div>
        <div ref={expandRef} className="h-[0%] bg-white"> 
          <LocationSearchPanel 
          suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
          setExpand={setExpand} 
          setVehiclePanel={setVehiclePanel} 
          setDestination={setDestination}
          setPickup={setPickup}
          activeField={activeField}
          />
        </div>
      </div>
      <div className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-5" ref={vehiclePanelRef}>
        <VehiclePanel 
        setVehiclePanel={setVehiclePanel}  
        setConfirmRidePanel={setConfirmRidePanel}
        fare = {fare}
        setVehicleType = {setVehicleType}
        />
      </div>
      <div className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-5" ref={confirmRidePanelRef} >
        <ConfirmRide 
        createRide = {createRide}
        pickup = {pickup}
        destination = {destination}
        setConfirmRidePanel={setConfirmRidePanel}  
        setVehicleFound={setVehicleFound} 
        fare = {fare}
        vehicleType={vehicleType}
        />
      </div>
      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-5'>
        <LookingForDriver
          setVehicleFound={setVehicleFound}
          pickup={pickup}
          destination = {destination}
          fare = {fare}
          vehicleType = {vehicleType}
        />
      </div>
      <div  className='fixed w-full z-10 bottom-0 bg-white px-3 translate-y-full py-6 pt-5' ref={waitingForDriverRef}>
        <WaitingForDriver
          setWaitingForDriver={setWaitingForDriver}
          ride={ride}
        />
      </div>
    </div>
  )
}

export default UserHome