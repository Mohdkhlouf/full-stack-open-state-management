import { useAnecdoteActions } from '../store'

const AnecdoteForm = () => {
  const getId = () => (100000 * Math.random()).toFixed(0)
  const { addAnecdote } = useAnecdoteActions()


  const addNote = (e) => {
    e.preventDefault()
    const note = {
      content : e.target.anecdote.value,
      id : getId(),
      votes : 0
    }
     addAnecdote(note)
    e.target.reset()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNote} data-testid="new">
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
