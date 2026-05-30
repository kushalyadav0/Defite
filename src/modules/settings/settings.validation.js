import { z } from 'zod'

export const updateSettingsValidation =
  z.object({
    companyName: z.string().optional(),
    supportEmail: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    logo: z.string().optional(),
    responseTime: z.string().optional(),
    socialLinks: z
      .object({
        linkedin: z.string().optional(),
        twitter: z.string().optional(),
        github: z.string().optional(),
      })
      .optional(),
  })