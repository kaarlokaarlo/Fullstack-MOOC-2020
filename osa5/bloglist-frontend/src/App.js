import React, { useState , useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [message, setNewMessage] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])




  const Notification = ({ message, style }) => {
    const notificStyle = {
      color: 'green' ,
      fontSize: '20px',
      background: 'lightgray' ,
      borderStyle: 'solid' ,
      padding: '10px' ,
      borderRadius: '5px',
      marginBottom: '10px'
    }

    if(style){
      notificStyle.color = 'red'
    }

    if (message === null) return null

    return (
      <div style = {notificStyle}>
        <br />
        <em>{message}</em>
      </div>
    )
  }


  const like = (id) => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id !== id ? b : returnedBlog))
      })
      .catch(() => {
        setErrorMessage(`Blog ${blog} not found on the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }


  const addBlog = (blog) => {

    blogService
      .create(blog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewMessage('added new blog')
        setTimeout(() => {
          setNewMessage(null)
        }, 5000)
      }
      )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in ', username, password)


    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setNewMessage('wrong username or password')
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
        setNewMessage(null)
      }, 5000)
    }
  }




  const loginForm = () => {
    return(
      <div>
        <h1>Log in </h1>
        <Notification message = {message} style = {true}/>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
  }



  const blogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>Create new blog</button>
        </div>
        <div style = {showWhenVisible}>
          <BlogForm
            createBlog = {addBlog}
          />
          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>
      </div>
    )

  }



  return (
    <div>


      {user === null ? loginForm()
        :
        <div>
          <h1>Blogs</h1>
          <Notification message = {message} style = {false} />
          {user.name} logged in
          <button onClick={logout}>logout</button>
          {blogForm()}
          {errorMessage}
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              like={() => like(blog.id)}
            />
          )}

        </div>
      }
    </div>
  )
}

export default App