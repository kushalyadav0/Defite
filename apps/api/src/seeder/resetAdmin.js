// One-time admin reset: sets the admin account in MongoDB to ADMIN_EMAIL /
// ADMIN_PASSWORD from the environment, creating it if it does not exist.
// Run with: npm run reset-admin
import mongoose from 'mongoose'
import { User } from '../modules/auth/auth.model.js'
import { env } from '../config/env.js'
import { logger } from '../config/logger.js'
import { connectDB } from '../config/db.js'
import { USER_ROLES } from '../modules/auth/auth.constants.js'

const resetAdmin = async () => {
  await connectDB()

  const email = env.ADMIN_EMAIL.toLowerCase()
  let user = await User.findOne({ email }).select('+password')

  if (!user) {
    user = new User({ name: env.ADMIN_NAME, email })
  }

  user.password = env.ADMIN_PASSWORD
  user.role = USER_ROLES.ADMIN
  await user.save()

  logger.info(`Admin ready: ${email}. Log in with ADMIN_PASSWORD from .env.`)
}

resetAdmin()
  .catch((error) => {
    logger.error('Admin reset failed:', error.message)
    process.exitCode = 1
  })
  .finally(() => mongoose.disconnect())
