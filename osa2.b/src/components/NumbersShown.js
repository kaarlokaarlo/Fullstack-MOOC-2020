import React from 'react'

const Button = ({id, name, handleClick}) =>{
  return <button name={name} id={id} onClick={handleClick}>delete</button>
}

const NumbersShown = ({pers,newC, handleClick}) =>{
  if(!(newC==='')){
    const numbs = pers.filter(a => (a.name.toLocaleLowerCase().includes(newC.toLocaleLowerCase())))
    return(
         numbs.map(a =>
          <div key={a.name}>
            <p>{a.name} kkk{a.number}
                <Button name={a.name} id={a.id} handleClick={handleClick}/>
            </p>
          </div>
    )
    )
  }else return(pers.map(a =>
    <div key={a.id}>
      <p> {a.name} {a.number}
        <Button name ={a.name} id ={a.id} handleClick={handleClick}/> 
      </p>
    </div>
    )
  )
}


    
export default NumbersShown