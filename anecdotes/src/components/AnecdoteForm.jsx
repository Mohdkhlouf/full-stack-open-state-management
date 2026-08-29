import { useAddAnecdote } from '../store'

const AnectdotForm = () => {
  const getId = () => (100000 * Math.random()).toFixed(0)
  const AddAnecdote = useAddAnecdote()


  const addNote = (e) => {
    e.preventDefault()
    const note = {
      content : e.target.anecdote.value,
      id : getId(),
      votes : 0
    }
     AddAnecdote(note)
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

export default AnectdotForm
