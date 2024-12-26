import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './pages/Home.jsx'
import CaptainSignUp from './pages/CaptainSignUp.jsx'
import { BrowserRouter, Routes, Route } from "react-router"
import CaptainLogin from './pages/CaptainLogin.jsx'
import UserSignUp from './pages/UserSignUp.jsx'
import UserLogin from './pages/UserLogin.jsx'
import { UserDataContext } from './context/UserContext.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/captainsignup" element={<CaptainSignUp/>} />
      <Route path="/captainlogin" element={<CaptainLogin/>} />
      <Route path="/usersignup" element={<UserSignUp/>} />
      <Route path="/userlogin" element={<UserLogin/>} />
    </Routes>
  )
}

export default App
