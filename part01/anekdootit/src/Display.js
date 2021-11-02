import React from 'react'

const Display = ({votes, anecdotes, selected}) => {
  return (
    <>
      <p>{anecdotes[selected]} <span>Votes: {votes[selected] || 0}</span></p>
    </>
  )
}

export default Display