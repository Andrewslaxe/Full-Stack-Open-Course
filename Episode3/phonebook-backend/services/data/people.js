import Person from '../../models/person.js'

const options = { runValidators: true }

const getPeople = async () => {
  const people = await Person.find({})
  return people.map(person => person.toJSON())
}

const getById = async (id) => {
  const person = await Person.findById(id)
  return person.toJSON()
}

const post = async (person) => {
  if (!person.name || !person.number) return { error: 'person or number does not exist' }
  const newPerson = new Person({
    name: person.name,
    number: person.number
  })
  await newPerson.save()
  return newPerson.toJSON()
}

const deleteById = async (id) => {
  await Person.findByIdAndRemove(id)
  return { status: 'deleted' }
}

const update = async (id, person) => {
  const updatedPerson = {
    name: person.name,
    number: person.number
  }
  await Person.findByIdAndUpdate(id, updatedPerson, options)
  return updatedPerson
}

export default { getPeople, getById, post, deleteById, update }
