const dummy = (blogs) => {
  return (typeof(blogs) === 'object') ? 1 : 0
}

const totalLikes = (blogs) => {
  
  return blogs.reduce((total, blog) => {
    return total + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  
  return blogs.reduce((popular, blog) => {
    return (popular.likes <= blog.likes) ? blog : popular
  })
}

const mostBlogs = (blogs) => {

  const newList = blogs.reduce((previous, current) => {
    let found = previous.find(person => {
      return person.author === current.author
    })

    if(!found) return previous.concat({ author: current.author, blogs: 1 })

    found.blogs++
    return previous
  }, [])

  return newList.reduce((previous, current) => {
    return (previous.blogs <= current.blogs) ? current : previous
  }) 
}

const mostLikes = (blogs) => {

  const newList = blogs.reduce((previous, current) => {
    let found = previous.find(person => {
      return person.author === current.author
    })

    if(!found) return previous.concat({ author: current.author, likes: current.likes })

    found.likes += current.likes
    return previous
  }, [])

  return favoriteBlog(newList)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}