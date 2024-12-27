import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router"
import UserContext from './context/UserContext.jsx'
import CaptainContext from './context/CaptainContext.jsx'
import App from './App.jsx'
createRoot(document.getElementById('root')).render(
  <CaptainContext>
    <UserContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContext>
  </CaptainContext>
)

