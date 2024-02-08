import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { orderBy } from "lodash"

const AnecdotesList = () => {

  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state)
  const orderedAnecdotes = orderBy(anecdotes, ["votes"], ["desc"])
  
  return (
    <div>
      {orderedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdotesList