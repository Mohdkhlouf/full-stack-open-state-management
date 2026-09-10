
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) throw new Error('Failed to fetch all anecdotes')

  const data = await response.json()

  return data
}

const createAnecdote = async (anecdote) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(anecdote)
  })

  if (!response.ok) throw new Error('Faild to add anecdote')

  return await response.json()
}

const updateAnecdote = async (id, anecdote) => {
  const response = await fetch(`${baseUrl}/${id}`,  {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote)
  })

  if (!response.ok) throw new Error('Failed to update anecdote')

  return await response.json()
}

const deleteAnecdote = async(id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers: {'Content-Type':'application/json'}
  })

  if (!response.ok) throw new Error('Failed to delete anecdote')

  return await response.json()
}

export default {getAll,createAnecdote, updateAnecdote, deleteAnecdote}
