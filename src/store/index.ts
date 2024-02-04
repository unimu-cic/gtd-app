import {create} from 'zustand'
import {devtools} from 'zustand/middleware'

type Priority = 'High' | 'Medium' | 'Low'

export type Item = {
  id: string,
  user_id: string
  title: string
  description: string
  startdate: Date
  enddate: Date | null
  priority: Priority | null
  status: boolean
}

interface State {
  list: Item[]
  loading: boolean
  empty: boolean
  setLoading: (state: boolean) => void
  addItem: (item: Item) => void
  setList: (list: Item[] | null) => void
  toggleItem: (item: Item) => void
  updateItem: (id: string, item: Item) => void
}

export const useToDoState = create<State>()(devtools((set) => ({
  list: [],
  loading: false,
  empty: false,
  updateItem: (id: String, updates: Item) => set((state) => {
    for (let i = 0; i < state.list.length; i++) {
      if (state.list[i].id === id) {
        state.list[i] = updates
        break;
      }
    }
    return {
      list: [...state.list]
    }
  }),
  addItem: (item: Item) => set((state) => ({
    list: [...state.list, item],
    empty: false
  })),
  toggleItem: (item: Item) => set((state) => {
    for (let i = 0; i < state.list.length; i++) {
      if (state.list[i].id === item.id) {
        state.list[i].status = !item.status;
        break;
      }
    }
    return {
      list: [...state.list]
    }
  }),
  setList: (list: Item[] | null) => set(() => ({
    list: list || [],
    empty: list?.length === 0
  })),
  setLoading: (state) => set(() => ({
    loading: state
  })),
})))

