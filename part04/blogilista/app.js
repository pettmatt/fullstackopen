const config = require('./utils/config')
const logger = require('./utils/logger')
const Blog = require('./models/blog')

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')

const app = express()

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to Mongo DB')
  })
  .catch((err) => {
    logger.error('error connecting to MongoDB:', err.message)
  })

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app