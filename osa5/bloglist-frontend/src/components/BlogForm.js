import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')


  const addBlog = (event) => {
    event.preventDefault()

    const blog = {
      title: newTitle,
      author:newAuthor,
      url: newUrl
    }

    createBlog(blog)
    setNewTitle('')
    setNewUrl('')
    setNewAuthor('')

  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  return(
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        title:<input
          value={newTitle}
          onChange={handleTitleChange}
        />
        <br/>
        author:<input
          value={newAuthor}
          onChange={handleAuthorChange}
        />
        <br/>
        url:<input
          value={newUrl}
          onChange={handleUrlChange}
        />
        <br/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm