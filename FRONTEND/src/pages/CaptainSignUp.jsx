import React from 'react'
import { Link } from 'react-router'
import { useState } from 'react'
function CaptainSignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [userData,setUserData] = useState({})
  const handleSubmit = (e) => {
    e.preventDefault()
    setUserData({
        fullName:{
          firstName:firstName,
          lastName:lastName
        },
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
              <h3 className='text-base font-semibold mb-2'>Enter Username</h3>
              <div className='flex gap-4'>
                <input 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='bg-[#eeeeee]  rounded px-4 py-2 border  text-base placeholder:text-base w-1/2'
                  type="email" 
                  placeholder="FirstName" 
                />
                <input 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='bg-[#eeeeee]  rounded px-4 py-2 border  text-base placeholder:text-base w-1/2'
                  type="email" 
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
                <button type="submit" className='flex bg-black font-semibold text-white w-full justify-center py-2 rounded px-4 mb-3'>Continue</button>
            </form>
            <p className='text-center '>Not new? <Link to='/captainlogin' className='text-blue-600'>Sign in</Link></p>
        </div>
        <div>
            <Link to='/usersignup' className='flex bg-[#d5622d] font-semibold text-white w-full justify-center py-2 rounded px-4 mb-7'>Sign up as User</Link>
        </div>
    </div>
  )
}

export default CaptainSignUp