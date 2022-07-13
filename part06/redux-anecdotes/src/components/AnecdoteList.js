import { useSelector, useDispatch } from 'react-redux'
import { completeVote } from '../reducers/anecdoteReducer'
import { notificationSet } from '../reducers/notificationReducer'
import { notificationReset } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(completeVote(id))
    const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id)
    
    console.log('VOTED', votedAnecdote)

    dispatch(notificationSet({
      header: 'Vote has been casted',
      message: `You voted for "${ votedAnecdote.content }" anecdote.`
    }))

    setTimeout(() => dispatch(notificationReset()), 5000)
  }

  return (
    <div>
    { anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    ) }
    </div>
  )
}

export default AnecdoteList