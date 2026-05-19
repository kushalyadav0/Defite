import app from './app.js'

import { env } from './config/env.js'
import { logger } from './config/logger.js'
import { connectDB } from './config/db.js'

const startServer = async () => {
  await connectDB()

  app.listen(env.PORT, () => {
    logger.info(`Server running on port ${env.PORT}`)
  })
}

startServer()