import React, { createContext, useEffect, useContext, useState } from 'react';
import { useAuth } from './Authprovider.jsx';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
}

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuth();

  useEffect(() => {
    if (authUser) {
      const socketInstance = io('http://localhost:5002/', {
        query: {
          userId: authUser.user._id,
        },
      });
      setSocket(socketInstance);

      socketInstance.on("getonline", (users) => {
        setOnlineUsers(users);
        console.log("Received online users:", users);
      });

      return () => {
        socketInstance.disconnect();
        socketInstance.close();
        setSocket(null);
        setOnlineUsers([]);
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
