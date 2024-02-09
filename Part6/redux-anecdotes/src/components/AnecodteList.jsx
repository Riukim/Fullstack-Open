import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { orderBy } from "lodash"
import { setNotification, removeNotification } from "../reducers/notificationReducer"

const AnecdotesList = () => {

  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    const lowercaseFilter = filter.toLowerCase();
    const filteredAnecdotes = anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(lowercaseFilter)
    );
    return orderBy(filteredAnecdotes, ["votes"], ["desc"]);
  });

  const handleVote = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(setNotification(`Voted for ${anecdote.content}`))
    
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000);
  }
  
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdotesList