
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) throw new Error('Failed to fetch all anecdotes')

  const data = await response.json()

  return data
}

const createAnecdote = async (anecdote,) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {'Content-Type':'apapplication/json'},
    body: JSON.stringify(anecdote)
  })

  if (!response.ok) throw new Error('Faild to add anecdote')

  return await response.json()
}


export default {getAll,createAnecdote}
