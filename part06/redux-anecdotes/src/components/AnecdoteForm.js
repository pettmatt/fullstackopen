import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnnecdote = async (event) => {
    event.preventDefault()

    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''

    console.log('ADDED', anecdote)
    dispatch(addAnecdote(anecdote))

    dispatch(showNotification({
      header: 'Anecdote has been added to list',
      message: `Anecdote "${ anecdote }".`
    }, 5))
  }

  return (
    <>
    <h3>create new</h3>
    <form onSubmit={createAnnecdote}>
      <div><input name='anecdote' /></div>
      <button type='submit'>create</button>
    </form>
    </>
  )
}

export default AnecdoteForm