import { create } from 'zustand'

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({selectedConversation}),
  messages: [],
  setMessages: (newMessages) => set({ messages: newMessages }), 
}));

export default useConversation;
