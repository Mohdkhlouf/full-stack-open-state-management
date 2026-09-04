
import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import anecdotesService from "./services/anecdotes"

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    votesIncrement: (id) => set(state => ({
      anecdotes: state.anecdotes.map(anecdote => anecdote.id === id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote)
    })),
    addAnecdote: (anecdote) => set(state => ({
      anecdotes: state.anecdotes.concat(anecdote)
    })),
    setFilter: (filter) => set(() => ({ filter })),
    initilize: async () => {
      const anecdotes = await anecdotesService.getAll()
      set({ anecdotes })
    }
  }
}))



export const useAnecdotes = () => useAnecdoteStore(useShallow((state) => {
  return state.filter
  ? state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  : state.anecdotes

}))
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useAnecdoteActions = () => useAnecdoteStore( state => state.actions)
