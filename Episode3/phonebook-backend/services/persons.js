let persons = null

async function fetchInfo () {
  const response = await fetch('D:/Courses/Full-Stack-Open-Course/Episode3/phonebook-backend/persons.json')
  const data = await response.json()
  persons = data
}

async function getDB () {
  if (!persons) await fetchInfo()
}

getDB()

const get = () => {
  return persons
}

const getById = (id) => {
  const person = persons.find(person => id === person.id)
  return person
}

const deleteById = (id) => {
  const person = persons.find(person => id === person.id)
  if (person) {
    persons = persons.filter(person => id !== person.id)
    return true
  }
  return false
}

const post = (person) => {
  if (!person.name || !person.number) return { error: 'person or number does not exist' }
  if (persons.find(({ name }) => name === person.name)) return { error: 'name must be unique' }
  const id = Math.floor(Math.random() * 100)
  persons.push({ id, ...person })
  return ({ id, ...person })
}

const update = (id, person) => {
  const personToUpdate = persons.find(person => id === person.id)
  if (personToUpdate) {
    personToUpdate.name = person.name
    personToUpdate.number = person.number
    return personToUpdate
  }
  return false
}

export default { get, getById, deleteById, post, update, persons }
