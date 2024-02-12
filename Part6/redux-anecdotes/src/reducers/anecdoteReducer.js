import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

/* const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
] */

/* const getId = () => (100000 * Math.random()).toFixed(0) */

/* const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject) */

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {

    vote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(n => n.id === id)

      const updateAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1 
      }

      console.log(JSON.parse(JSON.stringify(state)))

      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : updateAnecdote
      )
    },

    appendAnecdote(state, action) {
      state.push(action.payload)
    },

    setAnecdote(state, action) {
      return action.payload
    }
  }
})

export const { vote, appendAnecdote, setAnecdote } = anecdoteSlice.actions

export const inizializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const votedAnecdote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.updateVote(anecdote.id, anecdote.votes + 1)
    dispatch(vote(votedAnecdote.id))
  }
}

export default anecdoteSlice.reducer


/* const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case "VOTE":{
      const id = action.payload.id
      const anecdoteToVote = state.find(n => n.id === id)

      const updateAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1 
      }
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : updateAnecdote
      )
    }

    case "NEW_ANECDOTE": {
      return [...state, action.payload]
    }

    default:
      return state;
  }
}

export const createAnecdote = (content) => {
  return {
    type: "NEW_ANECDOTE",
    payload: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

export const vote = (id) => {
  console.log('vote', id)
  return{
    type: "VOTE",
    payload: { id }
  }
}

export default anecdoteReducer */