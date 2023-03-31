export const FilterContact = ({ setFilter, setPersonsToShow, persons }) => {
  const filterContacts = (e) => {
    e.preventDefault()
    setFilter(e.target.value)
    const filtered = e.target.value.toLowerCase()
    setPersonsToShow(persons.filter((person) => person.name.toLowerCase().includes(filtered)))
  }
  return (
    <div className='filter'>
      <h1>Filter contacts</h1>
      <form>
        <label htmlFor=''>Filter by name:</label>
        <input type='text' onChange={(e) => filterContacts(e)} />
      </form>
    </div>
  )
}
