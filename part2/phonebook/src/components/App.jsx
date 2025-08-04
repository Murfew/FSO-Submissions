import axios from 'axios'
import { useEffect, useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])


  const checkDuplicate = (name) => {
    return persons.filter((person) => person.name.toLowerCase() === name.toLowerCase()).length !== 0
  }

  const addPerson = (event) => {
    event.preventDefault()
    const duplicate = checkDuplicate(newName)

    if (duplicate) {
      alert(`${newName} is already in the phonebook`)
    } else {
      const personObject = {name: newName, number: newNumber};
      axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
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
