import mongoose from 'mongoose'
import { env } from './env.js'
import { logger } from './logger.js'

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URL)
    logger.info('MongoDB Connected')
  } 
  
  catch (error) {
    logger.error('MongoDB Connection Failed')
    process.exit(1)
  }
}