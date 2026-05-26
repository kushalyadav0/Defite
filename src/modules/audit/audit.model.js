import mongoose from 'mongoose'

const auditSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
    },

    module: {
      type: String,
      required: true,
    },

    performedBy: {
      type: mongoose.Schema.Types.ObjectId,

      ref: 'User',

      required: true,
    },

    metadata: {
      type: Object,

      default: {},
    },
  },
  {
    timestamps: true,
  }
)

export const AuditLog = mongoose.model(
  'AuditLog',
  auditSchema
)