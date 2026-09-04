
import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Filter from "./components/Filter"
import { useEffect } from "react"
import { useAnecdoteActions } from "./store"






const App = () => {
  const { initilize } = useAnecdoteActions()
  
  useEffect( () => {
    initilize()
  }, [initilize])

  return (
    <div>
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
