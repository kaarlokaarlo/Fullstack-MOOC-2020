import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const click = () => {
    const rand =   Math.floor(Math.random()*6)
      //console.log(rand)
    return(
      rand
    )
    }

const Button = (props) => (
        <button onClick = {props.click}>{props.desc}
        </button>
)


const App = (props) => {
  const [selected, setSelected] = useState(0)
  
  const [points, setPoints] = useState(new Uint8Array(6))
  const[mostLiked, setLiked] = useState(0)
  
  const setS = () => {
      const handlaus = () => {
      setSelected(click)
      }
      //console.log(points)
    //  console.log(selected)
      return handlaus
  }


  const setLike = () => {
    const handl = () =>{
    const copy = [...points]
      copy[selected] += 1
      
       setPoints(copy)
       console.log(copy)
       setLiked(Math.max(...copy))
       
      }
    
    return handl
  }



  return (
    <div>
       <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      
      <br/>
      
      <p>has {points[selected]}  votes</p>
      <br/>
       <Button click = {setLike()} desc = "vote"/> 
       <Button click = {setS()} desc = "next anecdote"/>
       <h1>Anecdote with most votes</h1>
       {props.anecdotes[points.indexOf(mostLiked)]}
       <p>has {mostLiked} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)




