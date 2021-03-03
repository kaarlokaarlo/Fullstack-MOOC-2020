import React, { useState } from 'react'

const Blog = ({ blog, like, remove }) => {

  const [fullInfo, setFullInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: fullInfo ? 'none' : '' }
  const showWhenVisible = { display: fullInfo ? '' : 'none' }

  const extended = (
    <div style = {showWhenVisible}>
      {blog.title} -<b>{blog.author}</b>
      <button onClick={() => setFullInfo(false)}>hide</button>
      <br/>
      {blog.url}
      <br/>
      Likes: {blog.likes} <button id="like-button" onClick={like}>Like</button>
      <br/>
      {blog.author}
      <button id="remove-button" onClick={remove} >remove</button>
    </div>

  )

  return(

    <div style = { blogStyle } >
      <div style = {hideWhenVisible} className='blog'>
        {blog.title} -<b>{blog.author}</b>
        <button id="view-button" onClick={() => setFullInfo(true)}>view</button>
      </div>
      {fullInfo ? extended : null}
    </div>


  )
}

export default Blog
