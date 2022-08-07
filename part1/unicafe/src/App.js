import React, {useState} from "react";

const Button = ({text, onClick}) => <button onClick={() => onClick(text)}>{text}</button>
const StatisticLine = ({text, value}) => <p>{text} {value}</p>
const Statistics = ({good, neutral, bad}) => {
  const total = good+neutral+bad
  const average = (good-bad)/total
  const percentage = good*100/(total)+"%"

  return (
    <div>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="total" value={total}/>
      <StatisticLine text="average" value={average}/>
      <StatisticLine text="positive" value={percentage}/>
    </div>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const feedbackGiven = good || neutral || bad

  function handleClick(text) {
    if (text === "good") setGood(good + 1)
    if (text === "neutral") setNeutral(neutral + 1)
    if (text === "bad") setBad(bad + 1)
  }

  return (  
    <div>
      <h2>give feedback</h2>
      <Button text="good" onClick={handleClick}/>
      <Button text="neutral" onClick={handleClick}/>
      <Button text="bad" onClick={handleClick}/>
      <h2>statistics</h2>
      {
        feedbackGiven ? 
        <Statistics 
          good={good} 
          neutral={neutral} 
          bad={bad}
        /> : 
        <p>No feedback given</p>
      }
      
    </div>
  );
}

export default App;
