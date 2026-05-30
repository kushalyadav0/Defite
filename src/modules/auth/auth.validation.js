import { z } from 'zod'

export const registerValidation = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
})

export const loginValidation = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})