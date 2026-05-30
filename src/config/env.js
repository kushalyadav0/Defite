import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  PORT: z.string().default('5000'),

  NODE_ENV: z.string().default('development'),

  MONGO_URI: z.string(),

  JWT_ACCESS_SECRET: z.string(),

  JWT_REFRESH_SECRET: z.string(),

  ADMIN_NAME: z.string(),

  ADMIN_EMAIL: z.string(),

  ADMIN_PASSWORD: z.string(),
})

export const env = envSchema.parse(process.env)