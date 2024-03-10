import {create} from "zustand";

export const useUserStore = create((set)=>({
    user: null,
    setUser: (newuser) => set({user: newuser}),
}))