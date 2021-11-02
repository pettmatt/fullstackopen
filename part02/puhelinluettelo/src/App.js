import React, {useState, useEffect} from 'react'
import Notification from './components/Notification'
import Person from './components/Person'
import Form from './components/Form'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ notification, setNotification ] = useState('')

  useEffect(() => {
    axios
    // Local 'http://localhost:3001/persons'
    // Online 'https://fullstackopen3b.herokuapp.com/persons'
    .get('http://localhost:3001/persons')
    .then(res => {
      const data = res.data
      setPersons(data)
    })
  }, []);

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }

    if(
      persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase()) ||
      persons.find(person => person.number === newPerson.number)
    ){
      setNotification(`"${newPerson.name}, ${newPerson.number}" is invalid. Name or number already exists`)
    }

    else {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }

    //console.log(persons)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    emptyNotification()
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
    emptyNotification()
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const emptyNotification = () => {
    if(notification)
      setNotification('');
  }

  const showPersons = newFilter !== ''
    ? persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()) === true)
    : persons

  return (
    <div>
      <h1>Phonebook</h1>
      
      { // If there is notification, show the message.
        notification.length > 0 &&
          <Notification header='Notification' message={notification} />
      }

      <Form addPerson={addPerson} newName={newName} newNumber={newNumber} 
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

      <div>
        <Filter handleFilterChange={handleFilterChange} />
      </div>

      <h2>Numbers</h2>
      <ul>
        {showPersons.map(person => 
            <Person key={person.id} person={person} />
        )}
      </ul>
    </div>
  )

}

export default App