const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  .populate('user', { username: 1, name: 1 })

  if(blogs) res.status(200).json(blogs)
  else res.status(400).json({ error: 'Something went wrong' })
})

blogRouter.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.find(req.params.id)
    if(blog) return res.status(200).json(blog)
    return blog
  } catch (err) {
    return res.status(400).json(err)
  }
})

blogRouter.post('/', async (req, res, next) => {
  const blog = new Blog(req.body)
  
  if(req.body.title == undefined || req.body.url == undefined)
    return res.status(400).json({ error: 'Title or url is missing.' })

  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if(!req.token || !decodedToken.id)
      return res.status(401).json({ error: 'Invalid token'})
    
    const user = await User.findById(decodedToken.id)
    const savedBlog = await blog.save()
    user.blogs = [...user.blogs, savedBlog.id]
    await user.save()
    res.status(201).json(savedBlog.toJSON())
  } catch (err) {
    next(err)
  }
})

blogRouter.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndRemove(req.params.id)
    if(blog) return res.status(200).json(blog)
    return blog
  } catch (err) {
    return res.status(400).json(err)
  }
})

blogRouter.put('/:id', async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, {
    title: req.body.title, author: req.body.author, 
    url: req.body.url, likes: req.body.likes 
  })

  res.status(201).json(blog)
})

module.exports = blogRouter