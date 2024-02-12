import { useDispatch, useSelector } from "react-redux"
import { orderBy } from "lodash"
import { setNotification, removeNotification } from "../reducers/notificationReducer"
import { votedAnecdote } from "../reducers/anecdoteReducer"

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
    dispatch(votedAnecdote(anecdote))
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