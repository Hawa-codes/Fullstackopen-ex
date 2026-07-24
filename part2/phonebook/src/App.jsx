import { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForms'
import Persons from './Persons'
import axios from 'axios'


const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const fetchData = () => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }


    const existingPerson = persons.find(
      person => person.name === newName
    )

    const existingNumber = persons.find(
      person => person.number === newNumber
    )


    if (existingPerson) {
      alert(`${newName} is already in the phonebook`)
    } 
    else if (existingNumber) {
      alert(`${newNumber} is already in the phonebook`)
    } 
    else {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }   

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }


  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )


  return (
    <div>

      <h2>Phonebook</h2>

      <Filter
        search={search}
        handleSearchChange={handleSearchChange}
      />


      <h2>Add a new</h2>

      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSearchChange={handleSearchChange}
      />


      <h2>Numbers</h2>

      <Persons persons={personsToShow}/>

    </div>
  )
}

export default App