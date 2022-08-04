import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from './queries/author'
import { ALL_BOOKS } from './queries/books'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'

const App = () => {
  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)
  
  const [page, setPage] = useState('authors')
  const [notification, setNotification] = useState(null)
  
  const notify = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 15000)
  }
  
  return (
    <div>
      { (notification)&& <Notification message={notification.message} type={notification.type} /> }
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} resultAuthors={resultAuthors} setNotification={notify} />

      <Books show={page === 'books'} resultBooks={resultBooks} />

      <NewBook show={page === 'add'} setNotification={notify} />
    </div>
  )
}

export default App
