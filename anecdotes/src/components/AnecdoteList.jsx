import { useAnecdotes,useNotication, useAnecdoteActions } from "../store"
import Notification from "./Notification"



const AnecdoteList = () => {

  const anecdotes = useAnecdotes()
  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)
  const notification = useNotication()

  const { votesIncrement, deleteAnecdote,  setNotification} = useAnecdoteActions()

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
            {anecdote.votes === 0 ? <button onClick={()=> deleteAnecdote(anecdote.id)} >Delete</button> : null}
          </div>
        </div>
      ))}

    </div>
  )
}

export default AnecdoteList
