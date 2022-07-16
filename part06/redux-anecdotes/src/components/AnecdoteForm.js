// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch()

  const createAnnecdote = async (event) => {
    event.preventDefault()

    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''

    console.log('ADDED', anecdote)
    // dispatch(addAnecdote(anecdote))
    props.addAnecdote(anecdote)

    // dispatch(showNotification({
    //   header: 'Anecdote has been added to list',
    //   message: `Anecdote "${ anecdote }".`
    // }, 5))
    props.showNotification({
      header: 'Anecdote has been added to list',
      message: `Anecdote "${ anecdote }".`
    }, 5)
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

const mapStateToProps = (state) => { return {} }
const mapDispatchToProps = { addAnecdote, showNotification }
const ConnectForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
export default ConnectForm