import { z } from 'zod'

export const createCMSValidation = z.object({
  slug: z.string(),

  title: z.string(),

  content: z.object({}).passthrough(),

  isPublished: z.boolean().optional(),
})

export const updateCMSValidation =
  createCMSValidation.partial()