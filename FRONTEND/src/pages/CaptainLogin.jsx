import React from 'react';
import { useState } from 'react'
import { Link } from 'react-router';
function CaptainLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [userData,setUserData] = useState({})
    const handleSubmit = (e) => {
      e.preventDefault()
      setUserData({
          email:email,
          password:password
      }
      )
      console.log(userData);
      setEmail('');
      setPassword('');
    }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-16 mb-5' src='https://www.svgrepo.com/show/505031/uber-driver.svg'/>
            <form onSubmit={handleSubmit}>
                <h3 className='text-lg font-semibold mb-2'>Enter Password</h3>
                <input 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                    type="password" 
                    placeholder="password" 
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
                <button type="submit" className='flex bg-black font-semibold text-white w-full justify-center py-2 rounded px-4 mb-3'>Continue</button>
            </form>
            <p className='text-center '>Join a Fleet? <Link to='/captainsignup' className='text-blue-600'>Register as Captain</Link></p>
        </div>
        <div>
            <Link to='/userlogin' className='flex bg-[#d5622d] font-semibold text-white w-full justify-center py-2 rounded px-4 mb-7'>Sign in as User</Link>
        </div>
    </div>
  )
}

export default CaptainLogin