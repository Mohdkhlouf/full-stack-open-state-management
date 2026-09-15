import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { addAnecdote, getAnecdotes, updateAnecdote } from '../requests'


export const useAnecdotes = () => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => {
      console.log(error.message)
    }
  })


  const newAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(anecdote))
    },
    onError: (error) => {
      console.log(error.message)
    }
  })

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError:result.isError,
    addAnecdote: (content) => newAnecdoteMutation.mutate({ content }),
    increseVoting: (anecdote) => updateAnecdoteMutation.mutate(anecdote)
  }
}
