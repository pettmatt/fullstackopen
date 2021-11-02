import React, { useState } from 'react'
import Button from './Button'
import Display from './Display'
import MostVoted from './MostVoted'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length + 1).join('0').split('').map(parseFloat))

  const randomSelect = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const voting = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <MostVoted votes={votes} anecdotes={anecdotes} />
      <Button clickEvent={randomSelect} text="Press for a new anecdote" />
      <Button clickEvent={voting} text="Vote++" />
      <Display votes={votes} anecdotes={anecdotes} selected={selected} />
    </div>
  )
}

export default App