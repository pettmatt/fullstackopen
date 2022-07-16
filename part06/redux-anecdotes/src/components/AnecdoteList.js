import { useSelector, useDispatch } from 'react-redux'
import { completeVoting } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => 
    state.anecdotes.filter(a => 
      a.content.toLowerCase().includes(filter.toLowerCase())
    )
  )

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(completeVoting(anecdote))    
    console.log('VOTED', anecdote)

    dispatch(showNotification({
      header: 'Vote has been casted',
      message: `You voted for "${ anecdote.content }" anecdote.`
    }, 5))
  }

  return (
    <div>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdoteList