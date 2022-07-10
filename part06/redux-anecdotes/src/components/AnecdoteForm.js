import { create } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnnecdote = (event) => {
    event.preventDefault()

    const anecdote = event.target.anecdote.value
    dispatch(create(anecdote))
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