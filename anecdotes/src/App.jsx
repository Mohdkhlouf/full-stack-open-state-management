import { useAnecdotes, useVotesIncrement } from "./store"
import AnectdotForm from "./components/AnecdoteForm"

const App = () => {

  const anecdotes = useAnecdotes()
  const vote = useVotesIncrement()


  return (
    <div>
      <h2>Anecdotes</h2>
      <AnectdotForm />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}

    </div>
  )
}

export default App
