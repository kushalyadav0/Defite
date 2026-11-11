import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      default: '',
    },

    technologies: {
      type: [String],
      default: [],
    },

    projectUrl: {
      type: String,
      default: '',
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
    category: {
  type: String,
  default: '',
},

gradient: {
  type: String,
  default: 'from-blue-500 to-purple-600',
},
  },
  {
    timestamps: true,
  }
)

export const Project = mongoose.model(
  'Project',
  projectSchema
)