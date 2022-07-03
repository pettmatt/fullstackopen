import axios from 'axios'

// const baseUrl = 'http://localhost:3001/api/persons'
const baseUrl = '/api/persons'

const getAll = async () => {
  return axios.get(baseUrl).then((res) => res.data)
}

const create = async (newPerson) => {
  return axios.post(baseUrl, newPerson).then((res) => res.data)
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = async (id, update) => {
  return axios.put(`${baseUrl}/${id}`, update).then((res) => res.data)
}

const exportObject = { getAll, create, deletePerson, update }

export default exportObject