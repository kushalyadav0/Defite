import { z } from 'zod'

export const createTestimonialValidation =
  z.object({
    name: z.string(),

    designation: z.string().optional(),

    message: z.string(),

    image: z.string().optional(),

    rating: z.number().optional(),

    isFeatured: z.boolean().optional(),
  })

export const updateTestimonialValidation =
  createTestimonialValidation.partial()