import ReactDOM from 'react-dom';
import './index.css';
import Filtter from './components/Filtter'
import PersonForm from './components/PersonForm'
import NumbersShown from './components/NumbersShown'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newCondition, setNewCondition ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const addName = (event) =>{
      
      event.preventDefault()
      const uusÄijjä = {
          name: newName,
          number: newNumber
        }
      if (!(persons.map(a => a.name).includes(uusÄijjä.name))){
        setPersons(persons.concat(uusÄijjä))
        setNewName('')
        setNewNumber('')
      } else window.alert(`${uusÄijjä.name} is already added to phonebook`)
  }
  
  const handleName = (event) =>{setNewName(event.target.value)}

  const handleNumber = (event) =>{
   console.log(event.target.value)
   setNewNumber(event.target.value)
}

const addCondition= (event) =>{
  event.preventDefault()
  setNewCondition("")
}

const handleFilter = (event) =>{
  setNewCondition(event.target.value)
}

 
  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filtter add = {addCondition} handle = {handleFilter} newC = {newCondition}/>
      <h2>Add a new</h2>
      <PersonForm add = {addName} newN = {newName} handle = {handleName} newNu = {newNumber} handleNu = {handleNumber} />
      <h2>Numbers</h2>   
        <NumbersShown pers = {persons} newC = {newCondition}/>  
     
    </div>
  )

}

export default App


ReactDOM.render(<App />, document.getElementById('root'));

