import mongoose from 'mongoose'

const password = process.argv[2]
const URL = `mongodb+srv://Kengan:${password}@freecluster.ausyirb.mongodb.net/note-app?retryWrites=true&w=majority`

export async function connectToDB () {
  try {
    await mongoose.connect(URL)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}
