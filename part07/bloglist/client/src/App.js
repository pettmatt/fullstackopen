// Note to self, remember to start backend (part04)
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
import Notification from './components/Notification'
import Login from './components/Login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInDetails')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedInDetails', JSON.stringify(user))
      blogService.setToken(user.token)
      
      setUser(user)
      setUsername('')
      setPassword('')

      setNotificationMessage(`You're in! Welcome, ${user.username}.`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong credentials.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleSubmit = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)

      setBlogs([...blogs, returnedBlog])
      setNotificationMessage(`A new blog "${blogObject.title} by ${blogObject.author}" added successfully`)

      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage('Error occured while creating new record: ' + error.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLike = (blog) => {
    const updatedBlog={ ...blog, likes: blog.likes + 1 }
    blogService.update(updatedBlog)
    .then(returnedBlog => {
      setBlogs(blogs.map(blog => (blog.id !== updatedBlog.id) ? blog : returnedBlog))
    })
    .catch(error => {
      console.log(error)
    })
  }

  const handleRemove = removableBlog => {
    if (window.confirm(`Do you want to delete "${removableBlog.title} by ${removableBlog.author}" blog?`)) {
      blogService.remove(removableBlog.id)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== removableBlog.id))
        setNotificationMessage(`Blog "${removableBlog.title}" deleted successfully.`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(`Error occured while deleting a blog ${error.message}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)    
      })
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedInDetails')
    setUser(null)
  }

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification errorMessage={errorMessage} notificationMessage={notificationMessage} />

      {
      (user === null)
      ? 
      <div>
        <Login 
          handleSubmit={handleLogin}
          username={username} password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </div>
      :
      <div>
        <p>Logged in as <b>{user.username}</b> 
        <button onClick={logOut}>logout</button></p>

        <Togglable buttonLabel='Add new blog' ref={blogFormRef}>
          <BlogForm handleSubmit={handleSubmit} user={user} />
        </Togglable>

        <h3>List of blogs</h3>
        {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
          <Blog
            key={blog.id} 
            blog={blog}
            handleLike={handleLike}
            handleRemove={handleRemove}
            user={user}
          />
        )}
      </div>
      }

    </div>
  )
}


export default App