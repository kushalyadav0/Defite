import mongoose from 'mongoose'
import { env } from './env.js'
import { logger } from './logger.js'

// Reused across requests. On Vercel each function instance connects once and
// keeps the connection for later requests instead of opening a new one.
let connecting = null

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return mongoose.connection

  if (!connecting) {
    connecting = mongoose
      .connect(env.MONGO_URI, { serverSelectionTimeoutMS: 10000 })
      .then((conn) => {
        logger.info('MongoDB Connected')
        return conn
      })
      .catch((error) => {
        connecting = null
        logger.error('MongoDB Connection Failed:', error.message)
        throw error
      })
  }

  return connecting
}
