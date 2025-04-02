import React, { createContext, useState, useContext } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState= Cookies.get('jwt') || localStorage.getItem('messanger');
  const [authUser, setAuthUser] = useState(initialState? JSON.parse(initialState) : undefined);

  const logout = () => { 
    Cookies.remove('jwt');
    localStorage.removeItem('token'); 
    setAuthUser(null); 
  };

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
