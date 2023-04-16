import persons from '../persons.json' assert {type: 'json'}

export const info = () => {
  const infoString = `Phonebook has info for ${persons.length} people <br/><br/>`
  const actualTime = new Date()
  return infoString + actualTime
}