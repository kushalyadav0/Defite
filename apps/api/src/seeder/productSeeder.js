import { Product } from '../modules/products/product.model.js'
import { logger } from '../config/logger.js'

// Defite's product line. Only products whose slug is missing are inserted,
// so edits made in the admin panel are never overwritten.
export const DEFAULT_PRODUCTS = [
  {
    name: 'Verso',
    slug: 'verso',
    tagline: 'Billing and day-to-day management for independent cafes and restaurants.',
    tags: ['Hospitality', 'POS', 'SaaS'],
    description:
      'Software for independent cafes and restaurants, focused on simplifying billing and day-to-day management. Runs in any browser with bills sent on WhatsApp.',
    audience: 'Independent cafes and restaurants',
    appUrl: 'https://dev.verso.defite.in',
    status: 'live',
    accent: '#f97316',
    order: 1,
  },
  {
    name: 'Nivao',
    slug: 'nivao',
    tagline: 'Management software for salons, spas and beauty businesses.',
    tags: ['Beauty & wellness', 'Management software'],
    description:
      'A management platform designed for salons, spas, and beauty businesses to organize their operations.',
    audience: 'Salons, spas and beauty studios',
    appUrl: 'https://app.nivao.defite.in',
    status: 'live',
    accent: '#ec4899',
    order: 2,
  },
  {
    name: 'Arvok',
    slug: 'arvok',
    tagline: 'POS and inventory for electronics and mobile shops.',
    tags: ['Electronics retail', 'POS', 'Inventory'],
    description:
      'Retail software focused on electronics and mobile shops, bringing billing, inventory, customer records, and store operations together.',
    audience: 'Electronics and mobile shops',
    appUrl: 'https://app.arvok.defite.in',
    status: 'coming_soon',
    accent: '#0ea5e9',
    order: 3,
  },
  {
    name: 'Rivao',
    slug: 'rivao',
    tagline: 'Retail software for clothing stores and garment sellers.',
    tags: ['Retail', 'Management software'],
    description:
      'Retail software focused on cloth stores and garments sellers, bringing billing, inventory, customer records, and store operations together.',
    audience: 'Clothing stores and garment sellers',
    appUrl: 'https://app.rivao.defite.in',
    status: 'live',
    accent: '#8b5cf6',
    order: 4,
  },
  {
    name: 'Teraa',
    slug: 'teraa',
    tagline: 'Operations monitoring for hotels and restaurants.',
    tags: ['Hospitality', 'Intelligence', 'Operations'],
    description:
      'Uses existing cameras to show what is happening on the floor: which tables are free, seated or waiting, how long guests wait, and how busy each server is, so managers can act sooner and run a more efficient operation.',
    audience: 'Hotels and restaurants',
    appUrl: 'https://teraa.defite.in',
    status: 'coming_soon',
    accent: '#10b981',
    order: 5,
  },
  {
    name: 'LeadGen',
    slug: 'leadgen',
    tagline: 'Find prospects that match your ideal customer.',
    tags: ['AI', 'Sales intelligence', 'Prospecting'],
    description:
      'An intelligent lead discovery platform designed to interpret business requirements and ideal customer profiles to identify relevant prospects.',
    audience: 'Sales and growth teams',
    appUrl: 'https://leadgen.defite.in',
    status: 'live',
    accent: '#eab308',
    order: 6,
  },
]

export const seedProducts = async () => {
  try {
    const existing = await Product.find({}, 'slug').lean()
    const have = new Set(existing.map((p) => p.slug))
    const missing = DEFAULT_PRODUCTS.filter((p) => !have.has(p.slug))
    if (missing.length) {
      await Product.insertMany(missing)
      logger.info(`Seeded ${missing.length} product(s)`)
    }
  } catch (error) {
    logger.error('Product seeding failed')
  }
}
