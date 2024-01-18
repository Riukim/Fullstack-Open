import { useState } from 'react'

const Title = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Anecdote = (props) => {
  return (
    <div>
        {props.anecdotes}
        <br />
        has {props.votes} votes
    </div>
  )
}

const MostVoted = (props) => {
  return (
    <div>
      {props.anecdotes}
      <br />
      has {props.votes} votes
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const numberOfAnecdotes = anecdotes.length;
  const [votes, setVotes] = useState(new Array(numberOfAnecdotes).fill(0))

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const getVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

/*   console.log(selected)
  console.log(votes) */

  const max = Math.max(...votes)
  const index = votes.indexOf(max)
/*   console.log(max)
  console.log(index) */
  
  const getRandomAnecdote = () => {
    setSelected(getRandomNumber(0, numberOfAnecdotes - 1))
  }


  return (
    <div>
      <Title text='Anecdote of the day'/>
      <Anecdote anecdotes={anecdotes[selected]} votes={votes[selected]}/>
      <Button handleClick={getVote} text='vote'/>
      <Button handleClick={getRandomAnecdote} text='next anecdote'/>
      <Title text='Anecdote with most votes'/>
      <MostVoted anecdotes={anecdotes[index]} votes={votes[index]}/>
    </div>
  )
}

export default App