import useNotify from '../hooks/useNotify'


const AnecdoteForm = ({ addAnecdote }) => {
  const { newNotification } = useNotify()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    addAnecdote(content)
    newNotification(`created '${content}'`)
      }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
