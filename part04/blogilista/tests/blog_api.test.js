const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blog ID is defined', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  blogs.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('Blog likes default to 0', async () => {
  const blog = new Blog()
  expect(blog.likes).toBe(0)
})

test('Backend responses with Bad Request', async () => {
  const blog = new Blog()
  await api.post('/api/blogs')
    .send(blog)
    .expect(400)
})

test('Post request', async () => {
  const originalDB = await Blog.find({})

  const newPost = {
    title: 'TEST POST',
    author: 'Tester',
    url: 'https://www.google.com',
    likes: 60
  }

  await api.post('/api/blogs')
    .send(newPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const DBAfter = await Blog.find({})
  expect(DBAfter.length).toBe(originalDB.length + 1)

  const author = DBAfter.map(blog => blog.author)
  expect(author).toContain('Tester')
})

test('Update request', async () => {
  const fetchByAuthor = await Blog.find({ author: 'Tester' })

  await api.put(`/api/blogs/${fetchByAuthor[1].id}`)
    .send({ likes: 99 })
    .expect(201)
    .expect('Content-Type', /application\/json/)
})

test('Delete request', async () => {
  const originalDB = await Blog.find({})
  const blogs = originalDB.map(blog => blog.toJSON())

  const deleteBlog = blogs[0]
  await api.delete(`/api/blogs/${deleteBlog.id}`)
  const DBAfter = await Blog.find({})

  expect(DBAfter.length).toBe(originalDB.length - 1)
})

afterAll(() => {
  mongoose.connection.close()
})