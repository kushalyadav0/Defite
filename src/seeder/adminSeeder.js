import { User } from '../modules/auth/auth.model.js'
import { env } from '../config/env.js'
import { logger } from '../config/logger.js'
import { USER_ROLES } from '../modules/auth/auth.constants.js'

export const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({
      email: env.ADMIN_EMAIL,
    })

    if (existingAdmin) {
      logger.info('Admin already exists')

      return
    }

    await User.create({
      name: env.ADMIN_NAME,
      email: env.ADMIN_EMAIL,
      password: env.ADMIN_PASSWORD,
      role: USER_ROLES.ADMIN,
    })

    logger.info('Default admin created')
  } catch (error) {
    logger.error('Admin seeding failed')
  }
}