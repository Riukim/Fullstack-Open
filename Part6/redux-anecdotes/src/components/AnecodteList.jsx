import { useDispatch, useSelector } from "react-redux"
import { orderBy } from "lodash"
import { votedAnecdote } from "../reducers/anecdoteReducer"
import { createNotification } from "../reducers/notificationReducer"

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
    dispatch(createNotification(`Voted for ${anecdote.content}`, 5))
    
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