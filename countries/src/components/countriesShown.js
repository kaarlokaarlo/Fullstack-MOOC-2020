import React from 'react'
import Filter from './filter'




const OneCountry = (props) =>{
       const maa = props
      // console.log("asdfghjk")
       
       console.log('onecountru')
       
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
        </>
          )
}




const CountriesShown = ({condition, countries, handleClick}) => {

   if (!(condition == "")){
      const maat = countries.filter(a => 
            a.name.toLowerCase()
            .includes(condition.toLowerCase()))

       if( maat.length == 1 ){
                    console.log(maat)
                  const maa = maat[0]
                  return OneCountry(maa) 
       }else if ( maat.length <= 10 ){
                  console.log('else ifi countriesshown')
                  return Filter({maat,handleClick})
       }else{
                  return 'Too many matches, specify another filter'
                }
   }else {
      return <p>Please input filter</p>
    }
  } 

  export default CountriesShown