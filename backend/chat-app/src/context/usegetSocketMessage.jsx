import React, { useEffect } from 'react';
// import { useSocketContext } from './SocketContext.jsx';
import {useSocketContext} from './SocketContex.jsx'
import useConversation from '../statemanage/useConversation.js';

const usegetSocketMessage = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        if (socket) {
            socket.on("newMessage", (newMessage) => {
                setMessages(prevMessages => [...prevMessages, newMessage]);
            });

            return () => socket.off("newMessage");
        }
    }, [socket,  setMessages]);
}

export default usegetSocketMessage;
