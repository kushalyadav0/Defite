import { z } from 'zod'
import { PRODUCT_STATUSES } from './product.model.js'

const url = z
  .string()
  .trim()
  .refine((v) => v === '' || /^https?:\/\//.test(v), {
    message: 'Must be a full URL starting with https://',
  })

export const createProductValidation = z.object({
  name: z.string().trim().min(1),
  slug: z.string().trim().min(1),
  tagline: z.string().optional(),
  tags: z.array(z.string()).optional(),
  description: z.string().optional(),
  audience: z.string().optional(),
  features: z.array(z.string()).optional(),
  appUrl: url.optional(),
  demoUrl: url.optional(),
  superadminUrl: url.optional(),
  status: z.enum(PRODUCT_STATUSES).optional(),
  accent: z.string().optional(),
  order: z.number().optional(),
  isPublished: z.boolean().optional(),
})

export const updateProductValidation = createProductValidation.partial()
