// Shown when the products API is unreachable or returns nothing.
// Keep in sync with apps/api/src/seeder/productSeeder.js (minus superadmin links).
export const FALLBACK_PRODUCTS = [
  {
    name: 'Verso',
    slug: 'verso',
    tagline: 'Billing and day-to-day management for independent cafes and restaurants.',
    tags: ['Hospitality', 'POS', 'SaaS'],
    description:
      'Software for independent cafes and restaurants, focused on simplifying billing and day-to-day management. Runs in any browser with bills sent on WhatsApp.',
    appUrl: 'https://dev.verso.defite.in',
    status: 'live',
    accent: '#f97316',
  },
  {
    name: 'Nivao',
    slug: 'nivao',
    tagline: 'Management software for salons, spas and beauty businesses.',
    tags: ['Beauty & wellness', 'Management software'],
    description:
      'A management platform designed for salons, spas, and beauty businesses to organize their operations.',
    appUrl: 'https://app.nivao.defite.in',
    status: 'live',
    accent: '#ec4899',
  },
  {
    name: 'Arvok',
    slug: 'arvok',
    tagline: 'POS and inventory for electronics and mobile shops.',
    tags: ['Electronics retail', 'POS', 'Inventory'],
    description:
      'Retail software focused on electronics and mobile shops, bringing billing, inventory, customer records, and store operations together.',
    appUrl: 'https://app.arvok.defite.in',
    status: 'coming_soon',
    accent: '#0ea5e9',
  },
  {
    name: 'Rivao',
    slug: 'rivao',
    tagline: 'Retail software for clothing stores and garment sellers.',
    tags: ['Retail', 'Management software'],
    description:
      'Retail software focused on cloth stores and garments sellers, bringing billing, inventory, customer records, and store operations together.',
    appUrl: 'https://app.rivao.defite.in',
    status: 'live',
    accent: '#8b5cf6',
  },
  {
    name: 'Teraa',
    slug: 'teraa',
    tagline: 'Operations monitoring for hotels and restaurants.',
    tags: ['Hospitality', 'Intelligence', 'Operations'],
    description:
      'Uses existing cameras to show what is happening on the floor: which tables are free, seated or waiting, how long guests wait, and how busy each server is, so managers can act sooner and run a more efficient operation.',
    appUrl: 'https://teraa.defite.in',
    status: 'coming_soon',
    accent: '#10b981',
  },
  {
    name: 'LeadGen',
    slug: 'leadgen',
    tagline: 'Find prospects that match your ideal customer.',
    tags: ['AI', 'Sales intelligence', 'Prospecting'],
    description:
      'An intelligent lead discovery platform designed to interpret business requirements and ideal customer profiles to identify relevant prospects.',
    appUrl: 'https://leadgen.defite.in',
    status: 'live',
    accent: '#eab308',
  },
];
