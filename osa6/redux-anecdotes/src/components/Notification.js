import React, {useState} from 'react'
import { useSelector } from 'react-redux'


const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style1 = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    visibility: 'visible'
  }
  
  const style = notification === null ? {...style1, visibility: 'hidden'} : style1


  return (
  
    <div style={style}>
      {notification}
    </div>
   
  )
}

export default Notification