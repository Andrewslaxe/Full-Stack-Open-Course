import mongoose from 'mongoose'

export async function connectToDB (URL) {
  try {
    await mongoose.connect(URL)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}
