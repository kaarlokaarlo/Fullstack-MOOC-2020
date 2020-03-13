import React , {useState} from 'react'


const Header = ({header}) =>{
  return(
    <h2>
     {header}
      </h2>
  )
}

  const Content = ({exet, nimi}) => {
   
    
    //console.log(total)
    return(
        <>
        {nimi} {exet}
        </>
    )
 }

const reducer = (accumalator,currentValue) => accumalator + currentValue.exercises
  

const Course = ({course}) => {
  //console.log('toimii')
  
    return(
   <>
    {course.map((a) =>
      <div key={a.id}>
         <Header header={a.name}/>
           {a.parts.map((kurssi) =>
             <p key={kurssi.id}>      
               <Content nimi ={kurssi.name} exet ={kurssi.exercises}/>
             </p>
            )}
          <b>total of {a.parts.reduce(reducer,0)} exercises</b>
      </div>
    )}
  </>
    )
}



export default Course
