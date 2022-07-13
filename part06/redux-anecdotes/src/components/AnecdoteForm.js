import { create } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { notificationSet, notificationReset } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnnecdote = (event) => {
    event.preventDefault()

    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''

    console.log('ADDED', anecdote)
    
    dispatch(create(anecdote))
    dispatch(notificationSet({
      header: 'Anecdote has been added to list',
      message: `Anecdote "${ anecdote }".`
    }))
    setTimeout(() => dispatch(notificationReset()), 5000)
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