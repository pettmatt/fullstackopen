import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {
  const { reset: contentReset, ...content } = useField('text')
  const { reset: authorReset, ...author } = useField('text')
  const { reset: infoReset, ...info } = useField('text')
  const [navigate, setNavigate] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })

    props.handleNotification({ content: content.value, author: author.value })
    setNavigate(true)
  }

  const handleReset = (e) => {
    e.preventDefault()
    
    contentReset()
    authorReset()
    infoReset()
  }

  return (
    <div>
      {navigate && (<Navigate to='/' replace='true' />)}
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content} />
        </div>
        <div>
          author
          <input name='author' {...author} />
        </div>
        <div>
          url for more info
          <input name='info' {...info} />
        </div>
        <button type='submit'>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew