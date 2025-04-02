import React, { useState, useEffect, useRef } from 'react';
import './ChatBox.css';
import assets from '../../assets/assets';
import useGetMessage from '../../context/useGetMessage.js';
import useConversation from '../../statemanage/useConversation.js';
import useSendMessage from '../../context/useSendMessage.js';
import { useSocketContext } from '../../context/SocketContex.jsx';
import usegetSocketMessage from '../../context/usegetSocketMessage.jsx';

const ChatBox = () => {
  const { messages, loading, error } = useGetMessage();
  usegetSocketMessage(); 

  const { selectedConversation, setSelectedConversation } = useConversation();
  const { sendMessages } = useSendMessage();
  const [newMessage, setNewMessage] = useState('');
  const [filteredMessages, setFilteredMessages] = useState([]);
  const chatEndRef = useRef(null);

  const { socket, onlineUsers } = useSocketContext();
  const authUser = JSON.parse(localStorage.getItem("messanger"));
  const yourUserId = authUser ? authUser.user._id : null;
  const isOnline = onlineUsers.includes(selectedConversation?._id);

  const getOnlineUserStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  useEffect(() => {
    if (selectedConversation && messages) {
      const filtered = messages.filter(msg => 
        msg.senderId === selectedConversation._id || 
        msg.receiverId === selectedConversation._id
      );
      setFilteredMessages(filtered.reverse());
    }
  }, [selectedConversation, messages]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [filteredMessages]);

  const handleSendMessage = () => { 
    if (newMessage.trim() === '') 
      return; 

    const newMessageObject = {
      senderId: yourUserId,
      receiverId: selectedConversation._id, 
      message: newMessage, 
      createdAt: new Date().toISOString(),
    }; 

    setFilteredMessages(prevMessages => [newMessageObject, ...prevMessages]);
  setNewMessage('');
  sendMessages(newMessage).catch(error => {
    console.error("Failed to send message");  });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!selectedConversation) return <p>Start conversation.</p>;

  return (
    <div className='chat-box'>
      <div className="chat-user">
        <img src={assets.profile_img} alt="Profile" />
        <p>
          <span>{selectedConversation.Username || 'Unknown User'}</span>
          <img src={assets.green_dot} className={`dot ${isOnline ? "online" : ""}`} alt="Online" />
          <span>{getOnlineUserStatus(selectedConversation._id)}</span>
        </p>
        <img src={assets.help_icon} className='help' alt="Help" />
      </div>

      <div className="chat-mes" style={{ backgroundColor: '#FFFFFF' }}>
        {Array.isArray(filteredMessages) && filteredMessages.length > 0 ? (
          filteredMessages.map((msg, index) => {
            const chatName = msg.senderId === yourUserId ? "s-msg" : "r-msg";
            return (
              <div key={index} className={`chat ${chatName}`}>
                <p className="msg">{msg.message}</p>
                <div>
                  <img src={assets.profile_img} alt="Sender" />
                  <p>{new Date(msg.createdAt).toLocaleTimeString()}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div><p>Say hi!</p></div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Send a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <input type="file" id="image" accept="image/png, image/jpeg" hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="Upload" />
        </label>
        <img
          src={assets.send_button}
          alt="Send"
          onClick={handleSendMessage}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </div>
  );
};

export default ChatBox;
