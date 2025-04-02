import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Chat from './pages/chat/Chat';
import Profileupdate from './pages/profileupdate/Profileupdate';
import AuthProvider, { useAuth } from './context/Authprovider';
import ErrorBoundary from './components/ErrorBoundary';

const ProtectedRoute = ({ children }) => { 
  const { authUser } = useAuth(); 
  return authUser ? children : <Navigate to="/login" />; 
};

const App = () => { 
  return ( 
    <AuthProvider> 
      <ErrorBoundary>  {/* Wrap your components with ErrorBoundary */}
        <Routes>
          <Route path='/' element={<Navigate to="/login" />} /> 
          <Route path='/login' element={<Login />} /> 
          <Route path='/chat' element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path='/profileupdate' element={<ProtectedRoute><Profileupdate /></ProtectedRoute>} />
        </Routes>
      </ErrorBoundary>
    </AuthProvider>
  ); 
}

export default App;
