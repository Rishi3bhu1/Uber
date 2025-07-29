import React, { useContext } from 'react'
import { useNavigate } from 'react-router';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
function CaptainProtectedWrapper({
    children
}) {
  const {captain,setCaptain,isLoading,setIsLoading} = useContext(CaptainDataContext)
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    React.useEffect(()=>{
      if(!token){
        navigate('/captain/login');
      }
      axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }).then((response)=>{
        if(response.status===200){
          setCaptain(response.data)
          setIsLoading(false)
        }
      }).catch((err)=>{
        console.log(err)
        localStorage.removeItem('token')
        navigate('/captain/login')
      })
    },[token])
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

export default CaptainProtectedWrapper