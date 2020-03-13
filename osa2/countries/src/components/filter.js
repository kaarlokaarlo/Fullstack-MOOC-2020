import React from 'react'
//import OneCountry from './components/countriesShown'



const Button = ({name, handleClick}) =>{ //
        return(
            <button name={name} onClick={handleClick}>Show</button>
            )
       }


const TopCountries = ({countries,handleClick}) =>{
    const c = countries
    return(
              c.map(co => 
                     <p key={c.indexOf(co)}>
                            {co.name}
                            {console.log('asdfghjh')}
                            <Button name = {co.name} handleClick={handleClick}/>
                    </p>
                )       
        )       
  }

const Filter = (props) =>{           //propseina lista maista
return(
    <>
      <TopCountries countries={props.maat}
       handleClick={props.handleClick}/>

      </>
)
}




export default Filter