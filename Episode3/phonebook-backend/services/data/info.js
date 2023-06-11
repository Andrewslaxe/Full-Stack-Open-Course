import people from './people.js'

export const info = async () => {
  const peopleSize = await people.getPeople().then(people => people.length)
  const infoString = `Phonebook has info for ${peopleSize} people <br/><br/>`
  const actualTime = new Date()
  return infoString + actualTime
}
