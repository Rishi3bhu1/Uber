import React from 'react'
import { Link } from 'react-router'
import { useState } from 'react'
function UserLogin() {
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
            <img className='w-16 mb-10' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'/>
            <form onSubmit={handleSubmit}>
                <h3 className='text-lg font-semibold mb-2'>What's your email</h3>   
                <div>
                    <input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="email" 
                        placeholder="email@example.com" 
                    />
                </div>         
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
            <p className='text-center '>New here? <Link to='/usersignup' className='text-blue-600'>Create new account</Link></p>
        </div>
        <div>
            <Link to='/captainlogin' className='flex bg-[#10b461] font-semibold text-white w-full justify-center py-2 rounded px-4 mb-7'>Sign in as Captain</Link>
        </div>
    </div>
  )
}

export default UserLogin
