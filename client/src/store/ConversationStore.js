import { create } from 'zustand';

export const useConversations = create((set)=> ({
    conversations: [],
    setConversations: (conversations) => set({conversations})
}))