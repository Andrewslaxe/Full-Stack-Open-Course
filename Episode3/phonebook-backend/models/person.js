import mongoose from 'mongoose'

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

export const Person = mongoose.model('Person', personSchema)
