import { Person } from '../../models/person.js'
import mongoose from 'mongoose'

export const save = async (name, number) => {
  const person = new Person({
    name,
    number
  })

  async function saveToMongo () {
    await person.save()
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    await mongoose.connection.close()
  }
  await saveToMongo()
}
