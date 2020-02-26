import ReactDOM from 'react-dom';
import './index.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountriesShown from './components/countriesShown'
import Filter from './components/filter'



const App = () =>{
const [ country , setCountry ] = useState([])
const [ condition , setCondition ] = useState('')

const handleCondition = (event) =>{
   setCondition(event.target.value)
}

const handleClick = (event) =>{
  console.log('nappia painettiin haha')
    setCondition(event.target.name)
  }


 useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountry((response.data))
       //console.log((response.data))
      })
  }, [])

  

return(
  <>
  
    <div>
      Find countries <input value = {condition} onChange={handleCondition}/>
    </div>  
    <div>
         <CountriesShown
              countries = {country}
              condition = {condition} 
              handleClick = {handleClick}
           />
    </div>
  </>
)
}


ReactDOM.render(<App />, document.getElementById('root'));

