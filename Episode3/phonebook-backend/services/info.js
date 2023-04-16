import { persons } from './persons.js'

export const info = () => {
  const infoString = `Phonebook has info for ${persons.length} people <br/><br/>`
  const actualTime = new Date()
  return infoString + actualTime
}
