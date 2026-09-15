import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
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



  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate(anecdote)
  }

  if (result.isPending) {
      return <div>loading data...</div>
    }

  if (result.isError) {
    return <div>anecdote service not avaliable due to problems in server</div>
  }

  const anecdotes = result.data
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm anecdotes={anecdotes} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
