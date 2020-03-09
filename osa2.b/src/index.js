import ReactDOM from 'react-dom';
import './index.css';
import Filtter from './components/Filtter'
import PersonForm from './components/PersonForm'
import NumbersShown from './components/NumbersShown'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'



const App = () => {
  
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newCondition, setNewCondition ] = useState('')

  
  useEffect(() => {
    personService
    .getAll()
    .then(response =>{
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
        personService
        .create(uusÄijjä)
        .then(response =>{
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })

    } else{ //window.alert(`${uusÄijjä.name} is already added to phonebook`)
        if(!(newNumber.isEmpty)){
          if(window.confirm(`${uusÄijjä.name} is already added to phonebook, replace the old number with a new one? `)){
            const dude = persons.find(p => p.name === uusÄijjä.name)
            const id = dude.id
            console.log(dude)
            
            //const number = pers.number
            //const number = persons.find(n => n.id === pers.id)
            const changedPerson = { ...dude, number: uusÄijjä.number }  
            console.log(changedPerson)
           
            personService
              .update(id, changedPerson)
              .then(response => {
                console.log(response.data)
                setPersons(persons.map(pers => pers.id !== id ? 
                    pers : response.data
                    ))
                
                  setNewName('')
                  setNewNumber('')
              })
        }
      }
    
  }
  
    }

  
  const handleName = (event) =>{setNewName(event.target.value)}

  const handleNumber = (event) =>{
   //console.log(event.target.value)
   setNewNumber(event.target.value)
}

const addCondition= (event) =>{
  event.preventDefault()
  setNewCondition("")
} 

const handleFilter = (event) =>{
  setNewCondition(event.target.value)
}

const handleClick =(event) =>{
  
  if(window.confirm('Delete ' + event.target.name + '?')){
    const deletedPerson = event.target
    //console.log(deletedPerson.id)
    //console.log(persons.map(person=>person.id))
    //console.log(persons.filter(person => (person.id !== deletedPerson.id)))    
    personService
    .deletePerson(event.target.id)
    .then(response =>{
      //console.log(deletedPerson)
      const ta = persons.filter(person => person.id != deletedPerson.id)
     // console.log(ta)
     // console.log(persons.filter(person => (person.id != deletedPerson.id)))    
      setPersons(ta)
    })
}
}



 
  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filtter add = {addCondition} handle = {handleFilter} newC = {newCondition}/>
      <h2>Add a new</h2>
      <PersonForm 
        add = {addName} 
        newN = {newName} 
        handle = {handleName} 
        newNu = {newNumber} 
        handleNu = {handleNumber} />
      <h2>Numbers</h2>   
        <NumbersShown
          handleClick={handleClick}
          pers = {persons}
          newC = {newCondition}/>  
     
    </div>
  )

}


export default App


ReactDOM.render(<App />, document.getElementById('root'));

