import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const anecdotesAtStart = []
const initialState = anecdotesAtStart

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setVotes(state, action) {
      const votedAnecdote = action.payload
      return state.map(anecdote => 
        anecdote.id === votedAnecdote.id ? votedAnecdote : anecdote)
        .sort((a, b) => b.votes - a.votes)
    }
  }
})

export const allAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.create(content)
    dispatch(appendAnecdote(anecdote))
  }
}

export const completeVoting = (anecdote) => {
  console.log('Adecdote', anecdote)
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.update(anecdote)
    dispatch(setVotes(votedAnecdote))
  }
}

export const { setAnecdotes, appendAnecdote, setVotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer