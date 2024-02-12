import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { getAnecdotes, updateVote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1
  })

  const updateVoteMutation = useMutation({
    mutationFn: updateVote,
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes")
    }
  })

  const handleVote = (anecdote) => {
    updateVoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    dispatch({type: "VOTE", payload: anecdote.content})
    setTimeout(() => {
      dispatch({type: "NULL"})
    }, 5000);
  }

  if (result.isPending) {
    return <div>Loading data...</div>
  }

  if (result.isError) {
    return <div>Error: {result.error.message}</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
