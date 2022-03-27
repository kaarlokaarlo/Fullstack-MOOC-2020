import React from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { voteNotification } from '../reducers/notificationReducer'
import { clearNotification } from '../reducers/notificationReducer'
import { newFilter } from '../reducers/filterReducer'




const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    console.log(filter.value)

    const dispatch = useDispatch()
    
    anecdotes.sort((a,b) => (b.votes - a.votes))

    const filtered = anecdotes.filter(a => (a.content.toLocaleLowerCase().includes(filter.toLocaleLowerCase())))
  

    const vote = (anecdote) => {
      console.log('vote', anecdote.id)
      dispatch(voteAnecdote(anecdote.id))
      dispatch(voteNotification(anecdote.content))

      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
    /*const filtered = anecdotes.filter(a => (a.content.toLocaleLowerCase().includes(filter.toLocaleLowerCase())))
    if(filter !== ''){
        const filtered = anecdotes.filter(a => (a.content.toLocaleLowerCase().includes(filter.toLocaleLowerCase())))
        return(
          <>
          filter:<input onChange={handleFilter}></input>
          {filtered.map(anec => 
            <div key = { anec.id }>
              <b>{anec.content}</b>
            </div>
            
          )}
          </>
        )

      } 
      else */
      return(
        <div>
            {filtered.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
                
                </div>
            )}
            
          </div>
    )
}

export default AnecdoteList