import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForms'
import Persons from './components/Persons'
// import axios from 'axios'
import personServices from './services/persons'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')

  const fetchData = () => {
    personServices.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const addPerson = (event) => {
  event.preventDefault();

  const existingPerson = persons.find(
    person => person.name === newName
  );

  if (existingPerson) {
    if (
      window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      )
    ) {
      const changedPerson = {
        ...existingPerson,
        number: newNumber,
      };

      personServices
        .update(existingPerson.id, changedPerson)
        .then(returnedPerson => {
          setPersons(
            persons.map(person =>
              person.id === existingPerson.id
                ? returnedPerson
                : person
            )
          );

          setNewName("");
          setNewNumber("");

          setMessageType("success");
          setMessage(`Updated ${returnedPerson.name}'s number`);

          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch(() => {
          setMessageType("error");
          setMessage(
            `Information of ${existingPerson.name} has already been removed from server`
          );

          setPersons(
            persons.filter(
              person => person.id !== existingPerson.id
            )
          );

          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    }

    return;
  }

  const existingNumber = persons.find(
    person => person.number === newNumber
  );

  if (existingNumber) {
    alert(`${newNumber} is already in the phonebook`);
    return;
  }

  const newPerson = {
    name: newName,
    number: newNumber,
  };

  personServices
    .create(newPerson)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson));

      setNewName("");
      setNewNumber("");

      setMessageType("success");
      setMessage(`Added ${returnedPerson.name}`);

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });
};



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

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      personServices
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
    });
  }
};


  return (
    <div>

      <h2>Phonebook</h2>

      <Notification message={message} type={messageType} />

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

      <Persons persons={personsToShow} deletePerson={deletePerson}/>

    </div>
  )
}

export default App