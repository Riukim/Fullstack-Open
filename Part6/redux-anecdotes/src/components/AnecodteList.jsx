import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { orderBy } from "lodash"

const AnecdotesList = () => {

  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    const lowercaseFilter = filter.toLowerCase();
    const filteredAnecdotes = anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(lowercaseFilter)
    );
    return orderBy(filteredAnecdotes, ["votes"], ["desc"]);
  });
  
  return (
    <div>
      {anecdotes.map((anecdote) => (
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