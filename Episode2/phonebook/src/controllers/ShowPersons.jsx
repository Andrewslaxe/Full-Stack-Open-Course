import contact from '../services/Contact'

export const ShowPersons = ({ persons, setPersons, setNotification }) => {
  return (
    <div>
      {persons.map((person, idx) => (
        <Person key={idx} person={person} persons={persons} setPersons={setPersons} setNotification={setNotification} />
      ))}
    </div>
  )
}

const Person = ({ person, persons, setPersons, setNotification }) => {
  const handleDelete = (e, id) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      contact.delete(person.id)
      setPersons(persons.filter(person => person.id !== id))
      setNotification({ type: 'error', message: `Deleted ${person.name}`, time: 5000 })
    }
  }
  return (
    <div className='person'>
      {person.name} {person.number}
      <button className='deleteButton' onClick={(e) => handleDelete(e, person.id)}>Delete</button>
    </div>
  )
}
