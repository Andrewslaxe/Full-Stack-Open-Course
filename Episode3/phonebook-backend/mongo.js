import mongoose from 'mongoose'
import { save } from './services/db/save.js'
import { get } from './services/db/get.js'

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Kengan:${password}@freecluster.ausyirb.mongodb.net/note-app?retryWrites=true&w=majority`

async function connectToMongoDB () {
  try {
    await mongoose.connect(url)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

await connectToMongoDB()

if (process.argv.length === 3) {
  get()
} else if (process.argv.length === 5) {
  save(process.argv[3], process.argv[4])
}
