import { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForms'
import Persons from './Persons'


const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')


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


  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )


  return (
    <div>

      <h2>Phonebook</h2>

      <Filter
        search={search}
        setSearch={setSearch}
      />


      <h2>Add a new</h2>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />


      <h2>Numbers</h2>

      <Persons persons={personsToShow}/>

    </div>
  )
}

export default App