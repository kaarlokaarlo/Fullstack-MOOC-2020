import React from 'react'

const Filtter = ({add,newC,handle}) => {
    return(
<form onSubmit={add}><div>filter shown with</div>
      <input
      value={newC}
      onChange={handle}
      /></form>
      )
}


export default Filtter
