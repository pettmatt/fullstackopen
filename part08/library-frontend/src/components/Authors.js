import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries/author'

const Authors = ({ show, resultAuthors, setNotification }) => {
  if (!show) return null
  else if (!resultAuthors) return <div><p>No authors found</p></div>
  else if (resultAuthors.loading) return <div><p>Loading . . .</p></div>

  const authors = resultAuthors.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <SetBirthyearForm authors={authors} setNotification={setNotification} />
    </div>
  )
}

const SetBirthyearForm = ({ authors, setNotification }) => {
  const [name, setName] = useState('')
  const [birthyear, setBirthyear] = useState('')

  const [ editAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setNotification(`Error occured while updating an author. ${error} `, 'Error Message')
    }
  })
  
  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ 
      variables: { name, setBornTo: parseInt(birthyear) }
    })

    setBirthyear('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
        name
        <select value={name} onChange={({ target }) => { setName(target.value) }}>
          {authors.map((a, i) => (
            <option key={i} value={ a.name }>{ a.name }</option>
          ))}
        </select>
        </div>
        <div>
        born 
        <input value={birthyear} onChange={({ target }) => { setBirthyear(target.value) }} />
        </div>
        <button type='submit'>update</button>
      </form>
    </div>
  )
}

export default Authors
