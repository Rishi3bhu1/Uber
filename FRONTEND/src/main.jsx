import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router"
import UserContext from './context/UserContext.jsx'
import CaptainContext from './context/CaptainContext.jsx'
import App from './App.jsx'
import SocketProvider from './context/SocketContext.jsx'
createRoot(document.getElementById('root')).render(
  <CaptainContext>
    <UserContext>
      <SocketProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SocketProvider>
    </UserContext>
  </CaptainContext>
)

