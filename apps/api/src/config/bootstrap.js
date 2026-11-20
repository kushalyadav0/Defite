import { connectDB } from './db.js'
import { seedAdmin } from '../seeder/adminSeeder.js'
import { seedProducts } from '../seeder/productSeeder.js'

// Connects to MongoDB and runs the seeders once per process. Used by the
// long-running server (server.js) and by each Vercel function instance.
let ready = null

export const ensureReady = () => {
  if (!ready) {
    ready = (async () => {
      await connectDB()
      await seedAdmin()
      await seedProducts()
    })().catch((error) => {
      ready = null
      throw error
    })
  }
  return ready
}
