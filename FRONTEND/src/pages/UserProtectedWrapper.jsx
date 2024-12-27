import React,{useContext, useEffect} from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate} from 'react-router-dom'
function UserProtectedWrapper({
    children
}) {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    useEffect(()=>{
      if(!token){
        navigate('/user/login');
      }
    },[token])
  return (
    <div>
        {children}
    </div>
  )
}

export default UserProtectedWrapper