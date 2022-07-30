import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, user }) => {

  const [extended, setExtended] = useState(false)

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    border: 'solid',
    borderWidth: 3,
    borderRadius: 3,
    marginBottom: 5,
    maxWidth: 350,
    minWidth: 200,
  }

  return (
  <div style={blogStyle} className='blog'>
    {blog.title}, {blog.author} <button id='extendButton' onClick={
      () => setExtended(!extended)}>{ (!extended) ? 'Extend' : 'Show less' }</button>
    {
      (extended)
      ?
      <div>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>likes: {blog.likes}</div>
        <div>
          <button id='likeButton' onClick={() => handleLike(blog)}>like</button>
          { 
          (user.name === blog.author) ? 
            <button id='removeButton' onClick={() => handleRemove(blog)}>remove</button>
          : ''
          }
        </div>
      </div>
      : ''
    }
  </div>
  )
}

export default Blog