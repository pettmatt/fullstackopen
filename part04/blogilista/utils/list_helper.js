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
  
  let result = []

  blogs.forEach(blog => {
    if(result.find(b => b.author === blog.author)) {
      result.find(b => b.author === blog.author).blogs++
    }

    else {
      const object = {author: blog.author, blogs: 1};
      result.push(object)
    }
      
  })

  return result.reduce((previous, current) => {
    return (previous.blogs <= current.blogs) ? current : previous
  })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}