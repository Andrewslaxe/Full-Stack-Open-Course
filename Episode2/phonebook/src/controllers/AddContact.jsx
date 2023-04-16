import { useState } from 'react'
import contact from '../services/Contact'

export const AddContact = ({ persons, setPersons, setNotification }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const resetForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const addName = async (e) => {
    e.preventDefault()
    const isAdded = persons.find(person => person.name === newName)
    if (isAdded) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number?`)) {
        contact.update(isAdded.id, { name: newName, number: newNumber })
        setPersons(persons.map(person => person.id === isAdded.id ? { ...person, number: newNumber } : person))
        setNotification({ type: 'success', message: `Updated ${newName}`, time: 5000 })
        resetForm()
      }
    } else {
      const createdContact = await contact.create({ name: newName, number: newNumber })
      setPersons(persons.concat(createdContact.data))
      setNotification({ type: 'success', message: `Added ${newName}`, time: 5000 })
      resetForm()
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
