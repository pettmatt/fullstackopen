import React, {useState, useEffect} from 'react'
import Notification from './components/Notification'
import Person from './components/Person'
import Form from './components/Form'
import Filter from './components/Filter'
import personService from './services/personService.js'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ notification, setNotification ] = useState('')

  useEffect(() => {
    personService.getAll()
      .then((people) => {
        setPersons(people)
      })
  }, []);

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if(newPerson.name === '' || newPerson.number === '') {
      setNotification('Name or number missing.')
      return
    }

    // Check if already exists
    if(
      persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())
    ){
      if(window.confirm(`${newPerson.name} already exists. Do you want to update their number with given number (${newPerson.number})?`)){
        const updateThisPerson = persons.find((person) => person.name === newName)

        const updatedPerson = {
          name: updateThisPerson.name,
          number: newPerson.number
        }

        personService.update(updateThisPerson.id, updatedPerson).then((updatedP) => {
          setPersons(persons.map((person) => person.id !== updateThisPerson.id
            ? person
            : updatedP
          ))

          setNotification(`"${updatedPerson.name}" updated`)
        })
        .catch((err) => {
          setNotification(`Error occured while updating: ${err}`)
        })
      }
      else 
        setNotification(`"${newPerson.name}, ${newPerson.number}" is invalid. Name already exists`)
    }

    else {
      // Create new person
      personService.create(newPerson).then((person) => {
        setPersons(persons.concat(person)) // Update list
        setNotification(`"${person.name}" added`)
      }).catch((err) => {
        setNotification(`Error occured while adding a person: ${err}`)
      })
      // setPersons(persons.concat(newPerson))
    }

    // No matter what the inputs are going to be wiped
    setNewName('')
    setNewNumber('')
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

  const deletePerson = (id, name) => {
    personService.deletePerson(id)
    .then(() => {
      setPersons(persons.filter(person => person.id !== id))
      setNotification(`"${name}" has been removed`)
    })
    .catch((err) => {
      setNotification(`"${name}" has already been removed`)
    })
  }

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
          <Person key={person.id} person={person} deletePerson={deletePerson} />
        )}
      </ul>
    </div>
  )

}

export default App