import React from 'react';
import { useState,useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { Link,useNavigate } from 'react-router';
import axios from 'axios';
function CaptainLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const {captain,setCaptain}=useContext(CaptainDataContext);
    const navigate = useNavigate()
    const handleSubmit = async(e) => {
      e.preventDefault()
      const Captain ={
        email:email,
        password:password
      }
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`,Captain)
      if(response.status===201){
        const data=response.data;
        setCaptain(data.captainExist);
        localStorage.setItem('token',data.token);
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
                <h3 className='text-lg font-semibold mb-2'>Enter Email</h3>
                <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                    type="email" 
                    placeholder="email@example.com" 
                />
                <h3 className='text-lg font-semibold mb-2'>Enter Password</h3>
                <input 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                    type="password" 
                    placeholder="password" 
                />
                <button type="submit" className='flex bg-black font-semibold text-white w-full justify-center py-2 rounded px-4 mb-3'>Login</button>
            </form>
            <p className='text-center '>Join a Fleet? <Link to='/captain/signup' className='text-blue-600'>Register as Captain</Link></p>
        </div>
        <div>
            <Link to='/user/login' className='flex bg-[#d5622d] font-semibold text-white w-full justify-center py-2 rounded px-4 mb-7'>Sign in as User</Link>
        </div>
    </div>
  )
}

export default CaptainLogin