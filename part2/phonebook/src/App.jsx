import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName }

    if (existingPerson) {
      alert(`${newName} is already in the phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
      setNewName('')
    }
  }

  const existingPerson = persons.find(person => person.name === newName)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div>number: <input /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App