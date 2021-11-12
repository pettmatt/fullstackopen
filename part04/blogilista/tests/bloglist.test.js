const listHelper = require('../utils/list_helper')
const list = require('../utils/bloglist.js')

test('dummy returns one', () => {
  const blogs = list

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})

describe('favorite blog', () => {
  const mostLikes = {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  }

  test('has 12 likes', () => {
    const result = listHelper.favoriteBlog(list)
    expect(result).toEqual(mostLikes)
  })
})

describe('author with most blogs', () => {
  const mostBlogs = {
    author: "Robert C. Martin",
    blogs: 3
  }

  test('has 3 blogs', () => {
    const result = listHelper.mostBlogs(list)
    expect(result).toEqual(mostBlogs)
  })
})

describe('author with most likes', () => {
  const mostLikes = {
    author: "Edsger W. Dijkstra",
    likes: 17
  }

  test('has 17 likes', () => {
    const result = listHelper.mostLikes(list)
    expect(result).toEqual(mostLikes)
  })
})