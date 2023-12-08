import { create } from 'zustand';

export const useConversations = create((set)=> ({
    currentConversation: null,
    setCurrentConversation: (conversation) => set({currentConversation: conversation}),
    conversations: [],
    setConversations: (conversations) => set({conversations})
}))