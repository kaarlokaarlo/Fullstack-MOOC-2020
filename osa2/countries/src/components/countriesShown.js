import React, {useState, useEffect} from 'react'
import Filter from './filter'
import axios from 'axios'



const OneCountry = (props) => {

  const maa = props
  const [ weather , setWeather] = useState([])
   
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    const params = {
      access_key: api_key,
      query: maa.capital,
      units: 'm'
    }
    axios
      .get('http://api.weatherstack.com/current',{params})
      .then(response => {
        setWeather(response.data.current)
       console.log((response.data.current.temperature))
      })
  }, [])
       console.log(weather)
        return(
        <>
          <h1>{maa.name}</h1>
          <p>capital {maa.capital}</p>
          <p>population {maa.population}</p>
          <h2>languages</h2>
          {maa.languages.map(l =>
            <ul key={maa.languages.indexOf(l)}>
               <li>{l.name}</li>
            </ul>
            )} 
          <img src={maa.flag} alt="flag"
             width= "100px" hspace="10"/>
          <h2>Weather in {maa.capital}</h2>
          <p><b>temperature:</b> {weather.temperature} Celcius</p>
          <br/><img src={weather.weather_icons} alt={maa.capital} />
          <p><b>wind:</b> {weather.wind_speed} km/h direction {weather.wind_dir}</p>


        </>

          )
}




const CountriesShown = ({condition, countries, handleClick}) => {

   if (!(condition == "")){
      const maat = countries.filter(a => 
            a.name.toLowerCase()
            .includes(condition.toLowerCase()))

       if( maat.length == 1 ){
                  const maa = maat[0]
                  return OneCountry(maa) 
       }else if ( maat.length <= 10 ){
                  return Filter({maat,handleClick})
       }else{
                  return 'Too many matches, specify another filter'
                }
   }else {
      return <p>Please input filter</p>
    }
  } 

  export default CountriesShown