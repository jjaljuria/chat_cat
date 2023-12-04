import { create } from 'zustand';

export const useSocket = create((set)=> ({
    socket: null,
    setSocket: (socket) => set({socket})
}))