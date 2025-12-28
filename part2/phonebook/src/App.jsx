import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(
      person => person.name.toLowerCase() === newName.toLowerCase()
    )

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber }

        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(
              persons.map(person =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            )
            setNewName('')
            setNewNumber('')
            showNotification(`Updated ${returnedPerson.name}'s number`, 'success')
          })
          .catch(error => {
            setPersons(persons.filter(p => p.id !== existingPerson.id))
            showNotification(
              `Information of ${existingPerson.name} has already been removed from server`,
              'error'
            )
          })
      }
      return
    }

    const personObject = { name: newName, number: newNumber }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        showNotification(`Added ${returnedPerson.name}`, 'success')
      })
      .catch(error => {
        showNotification('Failed to add person', 'error')
      })
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          showNotification(`Deleted ${name}`, 'success')
        })
        .catch(error => {
          setPersons(persons.filter(person => person.id !== id))
          showNotification(
            `Information of ${name} was already removed from server`,
            'error'
          )
        })
    }
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification} />

      <Filter filter={filter} setFilter={setFilter} />

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
