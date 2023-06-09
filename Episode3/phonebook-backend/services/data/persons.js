const personsDB = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122'
  }
]

let persons = null

async function fetchInfo () {
  const data = personsDB
  persons = data
}

async function getDB () {
  if (!persons) await fetchInfo()
}

await getDB()

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
