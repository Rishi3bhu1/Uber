import React from 'react'
import axios from 'axios'
import { Link,useNavigate} from 'react-router'
import { useState,useContext} from 'react'
import { UserDataContext } from '../context/UserContext'
function UserLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [userData,setUserData] = useState({});
    const {user,setUser} = useContext(UserDataContext);
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const user = {
            email:email,
            password:password
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,user)
        if(response.status===201){
            const data = response.data;
            setUser(data.userExist);
            localStorage.setItem('token',data.token)
            navigate('/user/home')
        }
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
                <button type="submit" className='flex bg-black font-semibold text-white w-full justify-center py-2 rounded px-4 mb-3'>Login</button>
            </form>
            <p className='text-center '>New here? <Link to='/user/signup' className='text-blue-600'>Create new account</Link></p>
        </div>
        <div>
            <Link to='/captain/login' className='flex bg-[#10b461] font-semibold text-white w-full justify-center py-2 rounded px-4 mb-7'>Sign in as Captain</Link>
        </div>
    </div>
  )
}

export default UserLogin
