import React from 'react'


const NumbersShown = ({pers,newC}) =>{
  if(!(newC==='')){
    const numbs = pers.filter(a => (a.name.toLocaleLowerCase().includes(newC.toLocaleLowerCase())))
    return(
         numbs.map(a =>
            <p key={a.name}>{a.name} {a.number}</p>
    )
    )
  }else return(pers.map(a =>
    <p key={a.name}>{a.name} {a.number}</p> 
    )
  )
}


    
export default NumbersShown