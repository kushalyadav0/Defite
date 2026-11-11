import mongoose from 'mongoose'

export const PRODUCT_STATUSES = ['live', 'beta', 'coming_soon']

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    tagline: { type: String, default: '' },
    tags: { type: [String], default: [] },
    description: { type: String, default: '' },
    audience: { type: String, default: '' },
    features: { type: [String], default: [] },
    // Public link to the product app (opened from the website).
    appUrl: { type: String, default: '' },
    // Optional separate demo link; falls back to appUrl on the website.
    demoUrl: { type: String, default: '' },
    // Link to the product's own superadmin. Admin panel only, never public.
    superadminUrl: { type: String, default: '' },
    status: {
      type: String,
      enum: PRODUCT_STATUSES,
      default: 'coming_soon',
    },
    accent: { type: String, default: '#6366f1' },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export const Product = mongoose.model('Product', productSchema)
