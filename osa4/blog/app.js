const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')


logger.info('connecting to ', config.mongoUrl)
mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    logger.info('connected to db')  
  })
  .catch((error) => {
    logger.error('error while connnecting to db: ', error.message)
  })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app
