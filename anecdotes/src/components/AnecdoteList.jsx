import { useAnecdotes,useNotication, useAnecdoteActions } from "../store"
import Notification from "./Notification"



const AnecdoteList = () => {

  const anecdotes = useAnecdotes()
  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)
  const notification = useNotication()

  const { votesIncrement } = useAnecdoteActions()
  const { setNotification } = useAnecdoteActions()

  return (
    <div>
      <Notification message={notification} />
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={
              () => {
                votesIncrement(anecdote.id)
                setNotification(`you voted ${anecdote.content}`)
              }
            }>vote</button>
          </div>
        </div>
      ))}

    </div>
  )
}

export default AnecdoteList
