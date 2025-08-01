import { useState } from 'react'
import Button from './Button'
import Header from './Header'
import Statistics from './Statistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  // Header - Button * 3 - Header - Statistics

  return (
    <div>
      <Header title={"Give Feedback"}/>
      <Button onClick={() => setGood(good + 1)} text="Good"/>
      <Button onClick={() => setNeutral(neutral + 1)} text="Netural"/>
      <Button onClick={() => setBad(bad + 1)} text="Bad"/>
      <Header title={"Statistics"}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
