
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/Authprovider.jsx'
import { SocketProvider} from './context/SocketContex.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
    <SocketProvider>
    <App />
    </SocketProvider>
   
  
   </AuthProvider>
  </BrowserRouter>
   
  
)
