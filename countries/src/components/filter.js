import React from 'react'
//import OneCountry from './components/countriesShown'



const Button = ({name, handleClick}) =>{ //
        console.log(name)
        return(
            <button name={name} onClick={handleClick}>Show</button>
            )
       }


const TopCountries = ({countries,handleClick}) =>{
    const c = countries
    console.log('topcountris')
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

const Filter = (props) =>{            //propseina lista maista
return(
    <>
    <div > find countries:</div>
      <TopCountries countries={props.maat}
       handleClick={props.handleClick}/>

      </>
)
}




export default Filter