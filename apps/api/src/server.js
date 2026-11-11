import app from './app.js'
import { env } from './config/env.js'
import { logger } from './config/logger.js'
import { connectDB } from './config/db.js'
import { seedAdmin } from './seeder/adminSeeder.js'
import { seedProducts } from './seeder/productSeeder.js'

const startServer = async () => {
  await connectDB()
  await seedAdmin()
  await seedProducts()
  app.listen(env.PORT, () => {
    logger.info(`Server running on port ${env.PORT}`)
  })
}

startServer()