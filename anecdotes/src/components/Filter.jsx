import { useAnecdoteActions } from '../store'

const Filter = () => {
  const { setFilter } = useAnecdoteActions()

  const filterText = (e) => {
    e.preventDefault()
    setFilter(e.target.value)
  }

  return (

    <div>
      <label htmlFor="filter"/> {'filter '}
      <input type="text" name="filter" onChange={(e) => filterText(e) } />
    </div>
  )
}

export default Filter
