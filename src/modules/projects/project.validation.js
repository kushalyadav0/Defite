import { z } from 'zod'

export const createProjectValidation =
  z.object({
    title: z.string(),

    slug: z.string(),

    description: z.string(),

    thumbnail: z.string().optional(),

    technologies: z
      .array(z.string())
      .optional(),

    projectUrl: z.string().optional(),

    isFeatured: z.boolean().optional(),
  })

export const updateProjectValidation =
  createProjectValidation.partial()