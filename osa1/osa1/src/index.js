import React from 'react'
import ReactDOM from 'react-dom'

//1.5

const Header = (props) => {
  return(
    <>
  <h1> {props.kurssi.name}</h1>
  </>
)
}

const Part = (props) => {
  return(
    <>
    <p>{props.pa1 + props.ex1}</p>
    </>
  )
}

const Content = (props) => {
  return(
<>
<Part pa1={props.elem[0].name} ex1={props.elem[0].exercises}/>
<Part pa1={props.elem[1].name} ex1={props.elem[1].exercises}/>
<Part pa1={props.elem[2].name} ex1={props.elem[2].exercises}/>
</>
)
}

const Total = (props) => {
  return(
    <>
 <p>Number of exercises {props.juttu[0].exercises + props.juttu[1].exercises + props.juttu[2].exercises}</p>
</>
)
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React ',
        exercises: 10
      },
      {
        name: 'Using props to pass data ',
        exercises: 7
      },
      {
        name: 'State of a component ',
        exercises: 14
      }
    ]
  }

  return (
    <div>

    <Header kurssi={course}/>
    <Content elem={course.parts}/>
    <Total juttu={course.parts}/>

    </div>
  )

}


ReactDOM.render(<App />, document.getElementById('root'))
