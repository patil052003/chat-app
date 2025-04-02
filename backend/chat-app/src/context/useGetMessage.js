import { useEffect, useState } from 'react';
import useConversation from '../statemanage/useConversation.js';
import axios from 'axios';

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      if (selectedConversation && selectedConversation._id) {
        setLoading(true);
        try {
          const response = await axios.get(`/api/message/get/${selectedConversation._id}`);
          console.log('API Response:', response.data);
          
          setMessages(response.data.messages); 
          setLoading(false);
        } catch (err) {
          console.error("Error fetching messages:", err);
          setError(err);
          setLoading(false);
        }
      }
    };
    getMessages();
  }, [selectedConversation, setMessages]);

  return { messages, loading, error };
};

export default useGetMessage;
