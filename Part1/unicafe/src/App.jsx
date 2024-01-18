import { useState } from 'react'

const Statistics = (props) => {
  const total = props.good + props.bad + props.neutral

  if (total === 0) {
    return(
      <p>No feedback given</p>
    )
  }
  return(
    <table>
      <tbody>
        <StatisticsLine text='good' value={props.good}/>
        <StatisticsLine text='neutral' value={props.neutral}/>
        <StatisticsLine text='bad' value={props.bad}/>

        <StatisticsLine text='total' value={total}/>
        <StatisticsLine text='average' value={total === 0 ? 0 : (props.good - props.bad) / total}/>
        <StatisticsLine text='positive' value={`${(props.good / total) * 100}%`}/>
      </tbody>
    </table>
  )
}

const StatisticsLine = (props) => {
  return (
    <tr>
      <td><b>{props.text}</b></td>
      <td>{props.value}</td>
    </tr> 
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGoodClick = () =>{
    setGood(good + 1) 
  }
  const handleBadClick = () =>{ 
    setBad(bad + 1)  
  }
  const handleNeutralClick = () =>{
    setNeutral(neutral + 1)  
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <br />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App