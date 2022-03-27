import React from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { newFilter } from '../reducers/filterReducer'


const Filter = () => {

  const dispatch = useDispatch()

  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    event.preventDefault()
    dispatch(newFilter(event.target.value))
  }
  
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter