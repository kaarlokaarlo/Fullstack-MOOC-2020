const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { response } = require('express')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs.map(b => b.toJSON()))
  })



blogsRouter.get('/:id', async(request,response) => {

        const id = request.params.id 
        const blog = await Blog.findById(id)
        if (blog) response.json(blog.toJSON())
        else response.status(404).end()

})


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}


blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

   if (body.title === undefined || body.url === undefined){
       return response.status(400).json({error: 'title or url missing'}).end()
    }
    
    
    const newBlog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    })

      const savedBlog = await newBlog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.json(savedBlog.toJSON())

  })

  blogsRouter.delete('/:id', async(request, response, next) => {
      const id = request.params.id
      const token = getTokenFrom(request)
      const decodedToken = jwt.verify(token, process.env.SECRET)
      
      const blog = await Blog.findById(id)
      const blogUser = blog.user.toString()
      console.log(blogUser)
      const tokenUser = decodedToken.id
      console.log(tokenUser)

      if(!token || !decodedToken.id || blogUser !== tokenUser) {
        return response.status(401).json({ error: 'Invalid token or user'})
      }
    

      await Blog.findByIdAndRemove(id)
      response.status(204).end()

  })

blogsRouter.put('/:id', async(request, response, next) => {

  const body = request.body

  const id = request.params.id

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updated = await Blog.findByIdAndUpdate(id, blog, {new: true})

  response.json(updated.toJSON())
})



  module.exports = blogsRouter
  