import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'

import people from './services/data/people.js'
import { connectToDB } from './services/db/connect.js'
import { info } from './services/data/info.js'
import { configuration } from './services/middleware/morgan.js'
import errorHandler from './services/middleware/errorHandler.js'
import unkonwnEndpoint from './services/middleware/unknownEndpoint.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT
const DBURL = process.env.MONDODB_URL

await connectToDB(DBURL)
app.use(cors())
app.use(morgan(configuration))
app.use(express.json())

app.get('/api/people', (_, response) => {
  people.getPeople().then(people => {
    response.send(people)
    response.status(200)
  })
})

app.get('/api/people/:id', (request, response, next) => {
  people.getById(request.params.id).then(person => {
    response.json(person)
  }).catch(error => {
    next(error)
  })
})

app.post('/api/people', (request, response, next) => {
  const person = request.body
  const result = people.post(person)
  result.then(result => {
    response.status(201).json(result)
  }).catch(error => {
    next(error)
  })
})

app.put('/api/people/:id', (request, response, next) => {
  const person = request.body
  people.update(request.params.id, person).then(result => {
    response.status(200).json(result)
  }).catch(error => {
    next(error)
  })
})

app.delete('/api/people/:id', (request, response, next) => {
  people.deleteById(request.params.id).then(result => {
    response.status(204).json(result)
  }).catch(error => {
    next(error)
  })
})

app.get('/api/info', async (_, response) => response.send(await info()))

app.get('/', (_, response) => response.send('Hello World!'))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use(errorHandler)
app.use(unkonwnEndpoint)
