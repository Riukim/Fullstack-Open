import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdotesList from './components/AnecodteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

import { useDispatch } from 'react-redux'
import { inizializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(inizializeAnecdotes()) 
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
        <Notification />
        <Filter />
        <AnecdotesList />
        <AnecdoteForm />
    </div>
  )
}

export default App