import React from 'react'
import { Link,useNavigate} from 'react-router'
import { useState,useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'
function CaptainSignUp(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [vehicleColor,setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const {captain,setCaptain}=useContext(CaptainDataContext);
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault()
    const CaptainData = {
      fullname:{
        firstname:firstName,
        lastname:lastName
      },
      email:email,
      password:password,
      vehicle:{
        color:vehicleColor,
        plate:vehiclePlate,
        capacity:vehicleCapacity,
        vehicleType:vehicleType
      }
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`,CaptainData)
    if(response.status===201){
      const data = response.data;
      console.log(data)
      setCaptain(data.captain);
      localStorage.setItem('token',data.token)
      navigate('/captain/home')    
    }
    setEmail('');
    setPassword('');
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-16 mb-5' src='https://www.svgrepo.com/show/505031/uber-driver.svg'/>
            <form onSubmit={handleSubmit}>
              <h3 className='text-base font-semibold mb-2'>Enter Username</h3>
              <div className='flex gap-4'>
                <input 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className='bg-[#eeeeee]  rounded px-4 py-2 border  text-base placeholder:text-base w-1/2'
                  type="text" 
                  placeholder="FirstName" 
                />
                <input 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className='bg-[#eeeeee]  rounded px-4 py-2 border  text-base placeholder:text-base w-1/2'
                  type="text" 
                  placeholder="LastName" 
                />
              </div>
                <h3 className='text-base font-semibold mb-2'>What's your email</h3>   
                <div>
                    <input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='bg-[#eeeeee]  rounded px-4 py-2 border w-full text-base placeholder:text-base'
                        type="email" 
                        placeholder="email@example.com" 
                    />
                </div>         
                <h3 className='text-base font-semibold mb-2'>Enter Password</h3>
                <input 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-base placeholder:text-base'
                    type="password" 
                    placeholder="password" 
                />
                <h3 className='text-base font-semibold mb-2'>Vehicle Information</h3>
                <div className='flex gap-4'>
                  <input 
                    value={vehicleColor}
                    onChange={(e) => setVehicleColor(e.target.value)}
                    required
                    className='bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-base placeholder:text-base'
                    type="text" 
                    placeholder="Vehicle Color" 
                  />
                  <select 
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    required
                    className='bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-base placeholder:text-base'
                  >
                    <option value="" disabled>Select Vehicle Type</option>
                    <option value="auto">Auto</option>
                    <option value="car">Car</option>
                    <option value="motorcycle">Motorcycle</option>
                  </select>
                </div>
                <div className='flex gap-4'>  
                  <input 
                    value={vehicleCapacity}
                    onChange={(e) => setVehicleCapacity(e.target.value)}
                    required
                    className='bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-base placeholder:text-base'
                    type="number" 
                    placeholder="Vehicle Capacity" 
                  />
                  <input 
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                    required
                    className='bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-base placeholder:text-base'
                    type="text" 
                    placeholder="Vehicle Plate" 
                  />
                </div>
                <button type="submit" className='flex bg-black font-semibold text-white w-full justify-center py-2 rounded px-4 mb-3'>Create Account</button>
            </form>
            <p className='text-center '>Not new? <Link to='/captain/login' className='text-blue-600'>Sign in</Link></p>
        </div>
        <div>
            <Link to='/user/signup' className='flex bg-[#d5622d] font-semibold text-white w-full justify-center py-2 rounded px-4 mb-7'>Sign up as User</Link>
        </div>
    </div>
  )
}

export default CaptainSignUp