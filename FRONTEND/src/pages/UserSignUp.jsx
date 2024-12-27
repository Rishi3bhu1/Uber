
import { useContext,useState } from 'react'
import { Link,useNavigate} from 'react-router';
import axios from 'axios';
import {UserDataContext} from '../context/UserContext.jsx'
function UserSignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [userData,setUserData] = useState({})
  const navigate = useNavigate();
  const {user,setUser} = useContext(UserDataContext);
  const handleSubmit = async(e) => {
      e.preventDefault()
      const newUser = {
        fullname:{
          firstname:firstName,
          lastname:lastName
        },
        email:email,
        password:password
      }
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser);
      if(response.status===201){
        const data = response.data;
        setUser(data.user);
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
                <button type="submit" className='flex bg-black font-semibold text-white w-full justify-center py-2 rounded px-4 mb-3'>Create Account</button>
            </form>
            <p className='text-center '>Not new? <Link to='/user/login' className='text-blue-600'>Sign in</Link></p>
        </div>
        <div>
            <Link to='/captain/signup' className='flex bg-[#10b461] font-semibold text-white w-full justify-center py-2 rounded px-4 mb-7'>Sign up as Captain</Link>
        </div>
    </div>
  )
}

export default UserSignUp