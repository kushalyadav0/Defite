import mongoose from 'mongoose'

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    designation: {
      type: String,
      default: '',
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: '',
    },

    rating: {
      type: Number,
      default: 5,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

export const Testimonial = mongoose.model(
  'Testimonial',
  testimonialSchema
)