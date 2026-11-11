import mongoose from 'mongoose'

const cmsSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: Object,
      default: {},
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

export const CMS = mongoose.model('CMS', cmsSchema)