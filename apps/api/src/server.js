import app from './app.js'
import { env } from './config/env.js'
import { logger } from './config/logger.js'
import { ensureReady } from './config/bootstrap.js'

// Long-running server (VPS / local). On Vercel, app.js is the entrypoint.
const startServer = async () => {
  try {
    await ensureReady()
  } catch {
    process.exit(1)
  }
  app.listen(env.PORT, () => {
    logger.info(`Server running on port ${env.PORT}`)
  })
}

startServer()
