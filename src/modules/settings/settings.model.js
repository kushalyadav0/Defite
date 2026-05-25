import mongoose from 'mongoose'

const settingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: '',
    },

    supportEmail: {
      type: String,
      default: '',
    },

    phone: {
      type: String,
      default: '',
    },

    address: {
      type: String,
      default: '',
    },

    logo: {
      type: String,
      default: '',
    },

    socialLinks: {
      linkedin: {
        type: String,
        default: '',
      },

      twitter: {
        type: String,
        default: '',
      },

      github: {
        type: String,
        default: '',
      },
    },
  },
  {
    timestamps: true,
  }
)

export const Settings = mongoose.model(
  'Settings',
  settingsSchema
)