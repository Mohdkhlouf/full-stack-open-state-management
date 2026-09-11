
import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import anecdotesService from "./services/anecdotes"
import { devtools } from 'zustand/middleware'

let leftTime = null

const useAnecdoteStore = create(devtools((set,get) => ({
  anecdotes: [],
  filter: '',
  notification:'',
  actions: {
    votesIncrement: async (id) => {
      const anecdote = get().anecdotes.find(anecdote => anecdote.id === id)
      const updated =  await anecdotesService.updateAnecdote(id, { ...anecdote, votes: anecdote.votes + 1 })
      set(state => ({
        anecdotes: state.anecdotes.map(anecdote => anecdote.id === id ? updated : anecdote)
      })      )},
    addAnecdote: async (note) => {
      const newAnecdote = await anecdotesService.createAnecdote(note)
      set(state => ({
        anecdotes: state.anecdotes.concat(newAnecdote)
      }))
    },
    setFilter: (filter) => set(() => ({ filter })),
    setNotification: (notification) => {
      if (leftTime) clearTimeout(leftTime)

      set(() => ({ notification: notification }))
      leftTime = setTimeout(() => {
          set(() => ({ notification: '' }))
        }, 5000)
    },
    initilize: async () => {
      const anecdotes = await anecdotesService.getAll()
      set({ anecdotes })
    },
    deleteAnecdote: async (id) => {
      await anecdotesService.deleteAnecdote(id)
      set(state => ({
        anecdotes: state.anecdotes.filter(anecdote => anecdote.id !== id)
      }))
    }
  }
})))



export const useAnecdotes = () => useAnecdoteStore(useShallow((state) => {
  const filtered = state.filter
    ? state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
    : state.anecdotes
  return filtered.toSorted((a, b) => b.votes - a.votes)
}))

export const useFilter = () => useAnecdoteStore((state) => {
  return state.filter
})
export const useNotication = () => useAnecdoteStore((state) => state.notification)
export const useAnecdoteActions = () => useAnecdoteStore( state => state.actions)

 export default useAnecdoteStore
