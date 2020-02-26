import React, { useState } from 'react'
import ReactDOM from 'react-dom'

//step 1.11

const Button = (props) => (
  <button onClick = {props.click}>{props.text}
  </button>
)

const StatisticLine = (props) =>{
  return (
<>
<td>{props.desc}</td>
<td>{props.amount}{props.pros}</td>
  </>  
  )
}

const Statistics = (props) =>{
  if(props.all != 0){
    return(
      <>
      <table>
        <tbody>
    <tr><StatisticLine amount={props.good} desc="good"/></tr>
    <tr><StatisticLine amount={props.neutral} desc="neutral"/></tr>
    <tr><StatisticLine amount={props.bad} desc="bad"/></tr>
    <tr><StatisticLine amount={props.all} desc="all"/></tr>
    <tr><StatisticLine amount={props.average} desc="average"/></tr>
    <tr><StatisticLine amount={props.pos} desc="positive" pros="%"/></tr>
      </tbody>
    </table>
    </>
    )
  } else {
    return(
      <>
    <p>No feedbacks given</p>
      </>
    )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const[average, setAv] = useState(0)
  const[pos, setPos] = useState(0)

  const setG = (newValue) => {
    const handler = () => {
    setGood(newValue)
    setAll(all+1)
    setAv((good+1-bad)/(all+1))
    setPos(((good+1)/(all+1))*100)
  }
  return handler
}

  const setN = (newValue) =>{
    const handler = () => {
      setNeutral(newValue)
      setAll(all+1)
      setPos(((good)/(all+1))*100)
}
return handler
 }

  const setB = (newValue) => {
    const handler = () => {
    setBad(newValue)
    setAll(all+1)
    setAv((good-bad-1)/(all+1))
    setPos(((good)/(all+1))*100)
}
return handler
}

  return (
    <div>
    <h1>give feedback</h1>
      <Button click={setG(good+1)} text="good"/>
      <Button click={setN(neutral+1)} text="neutral"/>
      <Button click={setB(bad+1)} text="bad"/>

      <h1>statistics</h1>
     
      <Statistics all={all} good={good} bad={bad} neutral={neutral} average={average} pos={pos} />

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
