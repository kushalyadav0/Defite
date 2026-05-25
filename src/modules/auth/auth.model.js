import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'

import { USER_ROLES } from './auth.constants.js'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Invalid email'],
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.USER,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return

  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function (
  password
) {
  return bcrypt.compare(password, this.password)
}

export const User = mongoose.model('User', userSchema)