import React,{useContext, useState,useEffect} from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate} from 'react-router-dom'
import axios from 'axios';
function UserProtectedWrapper({
    children
}) {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState(false)
    useEffect(()=>{
      if(!token){
        navigate('/user/login');
      }
    },[token])
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then((response)=>{
      if(response.status===201){
        setCaptain(response.data.captain)
        setIsLoading(false)
      }
    }).catch((err)=>{
      console.log(err)
      localStorage.removeItem('token')
      navigate('/user/login')
    })
    if(isLoading){
      return (
        <div>
          Loading....
        </div>
      )
    }
  return (
    <div>
        {children}
    </div>
  )
}

export default UserProtectedWrapper