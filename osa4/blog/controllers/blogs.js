const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { response } = require('express')
const User = require('../models/user')

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

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const user = await User.findById(body.userId)

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
  