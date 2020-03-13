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
  const [ newMessage, setNewMessage ] = useState(null)
  const [ newStyle, setNewStyle ] = useState(false)



  
  useEffect(() => {
    personService
    .getAll()
    .then(response =>{
      setPersons(response.data)
    })
  }, [])


 const Notification = ({ message, style }) =>{
     const notificStyle = {
     color: 'green' ,
     fontSize: '20px',
     background: 'lightgray' ,
     borderStyle: 'solid' ,
     padding: '10px' ,
     borderRadius: '5px',
     marginBottom: '10px'
   }
   console.log(style)
   if(style){
     console.log('ddddasssss')
     notificStyle.color = 'red' 
   }
  
   if (message === null) return null

   return (
     <div style = {notificStyle}>
       <br />
       <em>{message}</em>
     </div>
   )
 }

  const addName = (event) =>{
      event.preventDefault()
        const uusÄijjä = {
          name: newName,
          number: newNumber
        }
     if (!(persons.map(a => a.name.toLowerCase()).includes(uusÄijjä.name.toLowerCase()))){
        personService
        .create(uusÄijjä)
        .then(response =>{
          setPersons(persons.concat(response.data))
          setNewMessage(`Added ${uusÄijjä.name}`)
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setNewMessage(null)
            }, 5000)
          
        })

    } else{ //window.alert(`${uusÄijjä.name} is already added to phonebook`)
        if(!(newNumber.isEmpty)){
          if(window.confirm(`${uusÄijjä.name} is already added to phonebook, replace the old number with a new one? `)){
            const dude = persons.find(p => p.name.toLowerCase() === uusÄijjä.name.toLowerCase())
            const id = dude.id
            const changedPerson = { ...dude, number: uusÄijjä.number }  
            console.log(changedPerson)
           
            personService
              .update(id, changedPerson)
              .then(response => {
                console.log(response.data)
                setPersons(persons.map(pers => pers.id !== id ? 
                    pers : response.data
                    ))
                  setNewMessage(`Updated ${dude.name}'s number`)
                  setNewName('')
                  setNewNumber('')
                  setTimeout(() => {setNewMessage(null)}, 5000)
              })
              .catch(error =>{
                setNewMessage(`Information of ${dude.name} has already been removed from server`,1)
                setNewStyle(true)
                setTimeout(() => {
                  setNewMessage(null)
                  setNewStyle(false)}, 5000)
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
     personService
    .deletePerson(event.target.id)
    .then(response =>{
      const ta = persons.filter(person => person.id != deletedPerson.id)
      setPersons(ta)
      setNewMessage(`Deleted ${deletedPerson.name}`)
      setTimeout(() => {setNewMessage(null)}, 5000)
    })
    .catch(error =>{
      setNewMessage(`Information of ${deletedPerson.name} has already been removed from server`)
      setNewStyle(true)
      setTimeout(() => {
         setNewMessage(null)
         setNewStyle(false)}, 5000)
    })
}
}



 
  return (
    <div>
      <h2>Phonebook</h2>
      
      <Notification message = {newMessage} style={newStyle} />

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

