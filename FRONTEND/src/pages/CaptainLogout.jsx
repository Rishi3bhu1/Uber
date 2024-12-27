import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router';
import axios from 'axios';

function CaptainLogout() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    axios.get(`${import.meta.env.VITE_BASE_URL}/captain/logout`,{
      headers:{
        Authorization:`Bearer ${token}`
      }}).then((response) => { 
        if(response.status === 200){
          localStorage.removeItem('token');
          navigate('/captain/login')
        }
      }).catch((error) => {
        console.log(error);
      })
    return (
      <div>UserLogout</div>
    )
}

export default CaptainLogout