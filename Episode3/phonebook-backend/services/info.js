import persons from './persons.js'

export const info = () => {
  const infoString = `Phonebook has info for ${persons.persons} people <br/><br/>`
  const actualTime = new Date()
  return infoString + actualTime
}
