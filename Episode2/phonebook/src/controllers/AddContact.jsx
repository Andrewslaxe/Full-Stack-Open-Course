import { useState } from 'react'
import contact from '../services/Contact'

export const AddContact = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const addName = (e) => {
    e.preventDefault()
    const isAdded = persons.find(person => person.name === newName)
    if (isAdded) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number?`)) {
        contact.update(isAdded.id, { name: newName, number: parseInt(newNumber) })
      }
    } else {
      setNewName('')
      setNewNumber('')
      setPersons(persons.concat({ name: newName, number: parseInt(newNumber) }))
      contact.create({ name: newName, number: parseInt(newNumber) })
    }
  }
  return (
    <div>
      <form id='addContact' onSubmit={(e) => addName(e)}>
        <h1>Add a new contact</h1>
        <label htmlFor=''>Name:</label>
        <input type='text' onChange={(e) => setNewName(e.target.value)} value={newName} />
        <label htmlFor=''>Number:</label>
        <input type='text' onChange={(e) => setNewNumber(e.target.value)} value={newNumber} />
        <div><button type='submit'>Add</button></div>
      </form>
    </div>
  )
}
