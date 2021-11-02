import React from 'react'

const MostVoted = ({votes, anecdotes}) => {
  const mostVotes = votes.indexOf(Math.max(...votes))

  return (
    <>
      <h2>Most voted! <span>With {votes[mostVotes]} votes</span></h2>
      <p><b>{anecdotes[mostVotes]}</b></p>
    </>
  )
}

export default MostVoted