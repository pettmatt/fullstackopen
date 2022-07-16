import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
  const anecdote = {
    content,
    votes: 0
  }

  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const update = async (anecdote) => {
  const updatedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }

  const url = `${ baseUrl }/${ anecdote.id }`
  const response = await axios.put(url, updatedAnecdote)
  return response.data
}

export default { getAll, create, update }