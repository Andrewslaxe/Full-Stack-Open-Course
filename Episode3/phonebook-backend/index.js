import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import persons from './services/persons.js'
import { info } from './services/info.js'
import { configuration } from './services/middleware/morgan.js'

const PORT = process.env.PORT || 3001
const app = express()

app.use(cors())
app.use(morgan(configuration))
app.use(express.json())

app.get('/api/persons', (_, response) => response.json(persons.get()))

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons.getById(id) ? response.json(persons.getById(id)) : response.status(404).end()
})

app.get('/info', (_, response) => response.send(info()))

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons.deleteById(id) ? response.status(204).end() : response.status(404).end()
})

app.post('/api/persons', (request, response) => {
  const person = request.body
  const result = persons.post(person)
  result.error ? response.json(result.error) : response.json(result)
})

app.put('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = request.body
  const result = persons.update(id, person)
  result ? response.json(result) : response.status(404).end()
})

app.get('', (_, response) => response.send('Hello World!'))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
