import jwt from 'jsonwebtoken'

import { User } from './auth.model.js'

import { ApiError } from '../../utils/ApiError.js'

import { env } from '../../config/env.js'

export const registerUser = async (payload) => {
  const existingUser = await User.findOne({
    email: payload.email,
  })

  if (existingUser) {
    throw new ApiError(400, 'User already exists')
  }

  const user = await User.create(payload)

  return user
}

export const loginUser = async (payload) => {
  const user = await User.findOne({
    email: payload.email,
  }).select('+password')

  if (!user) {
    throw new ApiError(401, 'Invalid credentials')
  }

  const isPasswordMatched = await user.comparePassword(
    payload.password
  )

  if (!isPasswordMatched) {
    throw new ApiError(401, 'Invalid credentials')
  }

  const accessToken = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    env.JWT_ACCESS_SECRET,
    {
      expiresIn: '7d',
    }
  )

  return {
    accessToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  }
}