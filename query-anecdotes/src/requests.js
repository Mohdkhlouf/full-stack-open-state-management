const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) throw new Error('cannot fetch anecdotes')
  return await response.json()
}


export const addAnecdote = async (anecdote) => {

  if (anecdote.content.length < 5)
    throw new Error('anecdote size must be more than 5 letters')

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote)
}
  const response = await fetch(baseUrl, options)

  if (!response.ok) throw new Error('cannot add new anecdote')

  return response.json()
}


export const updateAnecdote = async (anecdote) => {
  const updatedAnecdote = {...anecdote, votes : anecdote.votes +1 }

  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body : JSON.stringify(updatedAnecdote)
  }

  const response = await fetch(`${baseUrl}/${anecdote.id}`, options)

  if (!response.ok)
    throw new Error('Cannot update the anecdote')

  return response.json()

}
