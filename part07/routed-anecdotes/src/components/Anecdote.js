import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(a => a.id === Number(id))
  const style = {
    'marginBottom': 20,
  }
  return (
    <div style={style}>
      <h2>{anecdote.content}</h2>
      <div>{anecdote.author}, {anecdote.votes}</div>
      <a href={anecdote.info}>More info</a>
    </div>
  )
}

export default Anecdote