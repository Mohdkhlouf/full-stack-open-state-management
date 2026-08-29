import { useAnecdotes, useVotesIncrement } from "../store"




const AnecdoteList = () => {

  const anecdotes = useAnecdotes()
  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)

  const vote = useVotesIncrement()

  return (
    <div>
      <h2>Anecdotes</h2>

      {sortedAnecdotes.map((anecdote) => (
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

export default AnecdoteList
