import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { configuration } from './services/middleware/morgan.js'

const PORT = process.env.PORT || 3001
const app = express()

app.use(cors())
app.use(morgan(configuration))
app.use(express.json())

app.get('/', (_, response) => response.send('Hello World!'))

app.get('/api/persons', (_, response) => {
  response.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
