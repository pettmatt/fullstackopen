import axios from 'axios'

// const baseUrl = 'http://localhost:3001/api/persons'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data)
}

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((res) => res.data)
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, update) => {
  return axios.put(`${baseUrl}/${id}`, update).then((res) => res.data)
}

export default { getAll, create, deletePerson, update }