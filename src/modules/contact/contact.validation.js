import { z } from 'zod'

export const createContactValidation =
  z.object({
    name: z.string().min(2),

    email: z.string().email(),

    subject: z.string().min(3),

    message: z.string().min(5),
  })