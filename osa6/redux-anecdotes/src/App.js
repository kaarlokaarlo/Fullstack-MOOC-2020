import React, { useState } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter' 


const App = () => {
  
  const [ notification, setNotification ] = useState(null)

  const handleNotification = () => {
      setNotification(Notification)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
      
  
  

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <br/>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm/>
    </div>
  )
}

export default App