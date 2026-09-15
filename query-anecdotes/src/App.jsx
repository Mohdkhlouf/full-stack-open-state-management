import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './hooks/useAnecdotes'
import useNotification from './hooks/useNotification'

const App = () => {
const {anecdotes, isPending,isError, addAnecdote,increseVoting } = useAnecdotes()
  const { newNotification } = useNotification()

const handleVote = (anecdote) => {
  increseVoting(anecdote)
  newNotification(`anecdote '${anecdote.content}' voted`)
  }

  if (isPending) {
      return <div>loading data...</div>
    }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm addAnecdote={addAnecdote} />

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
