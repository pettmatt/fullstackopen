import React, { useState } from 'react'

const BlogForm = ({ handleSubmit, user }) => {
  const [newBlog, setNewBlog] = useState({title: '', author: '', url: '', likes: 0})

  const onChange = (event) => {
    setNewBlog({...newBlog, [event.target.name]: event.target.value })
  }

  const handleBlogSubmit = (event) => {
    event.preventDefault()
    handleSubmit(newBlog)
    setNewBlog({ title: '', author: '', url: '', likes: 0, user })
  }

  const divStyle = {
    marginTop: 5,
    marginBottom: 5
  }

  return (
    <form onSubmit={handleBlogSubmit}>
      <div style={divStyle}>
        <label htmlFor='title'>Title</label>
        <input 
          id='titleInput'
          name='title'
          type='text'
          value={newBlog.title}
          onChange={onChange}
          placeholder='Example title for a blog'
        />
      </div>
      <div style={divStyle}>
        <label htmlFor='author'>Author</label>
        <input id='authorInput' name='author' 
          type='text' value={newBlog.author} 
          onChange={onChange}
          placeholder='Author J. Example'
        />
      </div>
      <div style={divStyle}>
        <label htmlFor='url'>URL</label>
        <input id='urlInput' name='url' 
          type='text' value={newBlog.url} 
          onChange={onChange}
          placeholder='http://www.example.com'
        />
      </div>
      <div style={divStyle}>
        <label htmlFor='likes'>Likes</label>
        <input id='likeInput' name='likes' 
          type='text' value={newBlog.likes} 
          onChange={onChange}
        />
      </div>
      <button id='submitButton' type='submit'>Add</button>
    </form>
  )
}
export default BlogForm