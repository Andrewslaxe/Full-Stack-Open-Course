import mongoose from 'mongoose'
import { Person } from '../../models/person.js'

export const get = async () => {
  await Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
  })
  await mongoose.connection.close()
  console.log('connection closed')
}
