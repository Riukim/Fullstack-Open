import AnecdoteForm from './components/AnecdoteForm'
import AnecdotesList from './components/AnecodteList'
import Filter from './components/Filter'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
        <Filter />
        <AnecdotesList />
        <AnecdoteForm />
    </div>
  )
}

export default App