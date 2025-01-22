import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import UserHome from './pages/UserHome.jsx'
import Start from './pages/Start.jsx'
import CaptainSignUp from './pages/CaptainSignUp.jsx'
import {Routes, Route } from "react-router"
import CaptainLogin from './pages/CaptainLogin.jsx'
import UserSignUp from './pages/UserSignUp.jsx'
import UserLogin from './pages/UserLogin.jsx'
import UserProtectedWrapper from './pages/UserProtectedWrapper.jsx'
import UserLogout from './pages/UserLogout.jsx'
import CaptainHome from './pages/CaptainHome.jsx'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper.jsx'
import CaptainLogout from './pages/CaptainLogout.jsx'
import Riding from './pages/Riding.jsx'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/captain/home" element={
        <CaptainProtectedWrapper>
          <CaptainHome/>
        </CaptainProtectedWrapper>
        } />
      <Route path="/captain/signup" element={<CaptainSignUp/>} />
      <Route path="/captain/login" element={<CaptainLogin/>} />
      <Route path="/captain/logout" element={<CaptainLogout/>} />
      <Route path="/user/signup" element={<UserSignUp/>} />
      <Route path="/user/login" element={<UserLogin/>} />
      <Route path='/user/riding' element={<Riding/>}/>
      <Route path='/user/home' element={
        <UserProtectedWrapper>
          <UserHome/>
        </UserProtectedWrapper>
        } />
      <Route path='/user/logout'  element={<UserLogout/>}/>
    </Routes>
  )
}

export default App
