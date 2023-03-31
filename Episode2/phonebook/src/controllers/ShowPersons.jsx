import contact from '../services/Contact'

export const ShowPersons = ({ persons }) => {
  return (
    <div>
      {persons.map((person, idx) => (
        <Person key={idx} person={person} />
      ))}
    </div>
  )
}

const Person = ({ person }) => {
  const handleDelete = (e, id) => {
    if (window.confirm(`Delete ${person.name} ?`)) contact.delete(id)
  }
  return (
    <div className='person'>
      {person.name} {person.number}
      <button className='deleteButton' onClick={(e) => handleDelete(e, person.id)}>Delete</button>
    </div>
  )
}
