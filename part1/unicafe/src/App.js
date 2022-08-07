import React, {useState} from "react";

const Statistics = ({good, neutral, bad, feedbackGiven}) => {

  const total = good+neutral+bad

  return (
    <p>
      good {good} <br/> 
      neutral {neutral}<br/>
      bad {bad} <br/>
      total {total} <br/>
      average {feedbackGiven ? (good-bad)/(total) : "-"} <br/>
      postive {feedbackGiven ? good*100/(total)+" %" : "-"}
    </p>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const feedbackGiven = good || neutral || bad

  return (  
    <div>
      <h2>give feedback</h2>
      <button onClick={() => {setGood(good+1)}}>good</button>
      <button onClick={() => {setNeutral(neutral+1)}}>neutral</button>
      <button onClick={() => {setBad(bad+1)}}>bad</button>
      <h2>statistics</h2>
      {
        feedbackGiven ? 
        <Statistics 
          good={good} 
          neutral={neutral} 
          bad={bad}
          feedbackGiven={feedbackGiven}
        /> : 
        <p>No feedback given</p>
      }
      
    </div>
  );
}

export default App;
