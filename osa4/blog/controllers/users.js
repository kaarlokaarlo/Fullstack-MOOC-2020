const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  .populate('blogs', { title: 1, likes: 1 })

  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if(body.username === undefined || body.password === undefined)
    return response.status(400).json({error: 'username or password missing'}).end()
  
  if(body.username.length < 3 || body.password.length < 3)
    return response.status(400).json({error: 'username and password must be at least three characters long'}).end()


  //console.log(body.username)

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})



module.exports = usersRouter