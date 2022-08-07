import React, {useState} from "react";

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good+neutral+bad
  const atLeastOneVote = good || neutral || bad

  return (  
    <div>
      <h2>give feedback</h2>
      <button onClick={() => {setGood(good+1)}}>good</button>
      <button onClick={() => {setNeutral(neutral+1)}}>neutral</button>
      <button onClick={() => {setBad(bad+1)}}>bad</button>
      <h2>statistics</h2>
      <p> 
        good {good} <br/> 
        neutral {neutral}<br/>
        bad {bad} <br/>
        total {total} <br/>
        average {atLeastOneVote ? (good-bad)/(total) : "-"} <br/>
        postive {atLeastOneVote ? good/(total)+" %" : "-"}
      </p>
    </div>
  );
}

export default App;
