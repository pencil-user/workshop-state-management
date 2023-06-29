import create from "zustand"
//import { devtools } from 'zustand/middleware'
import axios from 'axios';
import {Settings} from '../types/types'

type globalState = {
  count: number;
  settings: Settings | null
  NumbersList: number[]
  FilterUp: number
  actions: {
    increaseCount: () => void;
    setCount: (count: number) => void;
    fetchSettings: () => void;
  }
}

export const useStore = create<globalState>(set => ({
  count: 0,
  settings: null,
  NumbersList:[1,8,5,28,11,3,50,41],
  FilterUp:15,
  actions: {
    setCount: (count) => set({ count: count }),
    increaseCount: () => set((state) => ({ count: state.count + 1 })),
    fetchSettings: async () => {
      const settings = (await axios.get<Settings>(`http://127.0.0.1:3001/api/settings`)).data
      set({ settings })
    }
  }
}))
