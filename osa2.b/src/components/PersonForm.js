import React from 'react'


const PersonForm = ({ add,newN,handle,newNu,handleNu }) =>{
    return(
<form onSubmit = {add}>
        <div>name:</div>
        <input 
           value={newN}
           onChange={handle}
          />
        <div>
          <div>number:</div>
          <input
          value={newNu}
          onChange={handleNu}
          />
          <div>
          <button type="submit">add</button>
          </div>
        </div>
      </form>
    )
}

export default PersonForm