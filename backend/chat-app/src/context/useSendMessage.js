import { useState } from 'react';
import axios from 'axios';
import useConversation from '../statemanage/useConversation.js';

function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessages = async (newMessage) => {
    if (selectedConversation && selectedConversation._id) {
      setLoading(true);
      try {
        const response = await axios.post(`/api/message/send/${selectedConversation._id}`, { message: newMessage });
        console.log('API Response:', response.data);

        // Ensure messages is an array before updating it
        const updatedMessages = Array.isArray(messages) ? [...messages, response.data.message] : [response.data.message];
        
        setMessages(updatedMessages); 
        setLoading(false);
      } catch (err) {
        console.error("Error sending message:", err);
        setLoading(false);
      }
    }
  };

  return {
    loading,
    sendMessages
  };
}

export default useSendMessage;
