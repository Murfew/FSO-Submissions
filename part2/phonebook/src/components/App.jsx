import { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const checkDuplicate = (name) => {
    return persons.filter((person) => person.name.toLowerCase() === name.toLowerCase()).length !== 0
  }

  const addPerson = (event) => {
    event.preventDefault()
    const duplicate = checkDuplicate(newName)

    if (duplicate) {
      alert(`${newName} is already in the phonebook`)
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
    }
    setNewName('')
    setNewNumber('')
  }

  const onFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const onNameChange = (event) => {
    setNewName(event.target.value)
  }

  const onNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} onFilterChange={onFilterChange}/>
      <h3>Add new</h3>
      <PersonForm onFormSubmit={addPerson} name={newName} onNameChange={onNameChange} number={newNumber} onNumberChange={onNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons={persons} filter={newFilter}/>
    </div>
  )
}

export default App
