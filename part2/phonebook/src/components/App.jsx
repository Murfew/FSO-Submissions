import { useEffect, useState } from 'react'
import personService from '../services/persons'
import Filter from './Filter'
import Notification from './Notification'
import PersonForm from './PersonForm'
import Persons from './Persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const checkDuplicate = (name) => {
    return persons.filter((person) => person.name.toLowerCase() === name.toLowerCase()).length !== 0
  }

  const addPerson = (event) => {
    event.preventDefault()
    const duplicate = checkDuplicate(newName)

    if (duplicate) {
      const personToUpdate = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
      if (window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)) {
        personService
          .update(personToUpdate.id, { ...personToUpdate, number: newNumber})
          .then(updatedPerson => {
            setPersons(persons.map(person =>
              person.id !== personToUpdate.id ? person : updatedPerson
            ))
            setSuccessMessage(`Changed ${updatedPerson.name}'s number to ${updatedPerson.number}`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(() => {
            setErrorMessage(`Information of ${personToUpdate.name} has already been removed from the server`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== personToUpdate.id))
          })
      }

    } else {
      const newPerson = {name: newName, number: newNumber};
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setSuccessMessage(`Added ${newPerson.name}`)
          setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage !== null ? successMessage : errorMessage} className={successMessage !== null ? 'success' : 'error'}/>
      <Filter
        filter={newFilter}
        onFilterChange={(event) => setNewFilter(event.target.value)}
      />
      <h3>Add new</h3>
      <PersonForm
        onFormSubmit={addPerson}
        name={newName}
        onNameChange={(event) => setNewName(event.target.value)}
        number={newNumber}
        onNumberChange={(event) => setNewNumber(event.target.value)}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        filter={newFilter}
        handleDelete={deletePerson}
      />
    </div>
  )
}

export default App
