import jwt from 'jsonwebtoken'

import { env } from '../config/env.js'

import { ApiError } from '../utils/ApiError.js'

import { User } from '../modules/auth/auth.model.js'

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (
      !authHeader ||
      !authHeader.startsWith('Bearer ')
    ) {
      throw new ApiError(401, 'Unauthorized')
    }

    const token = authHeader.split(' ')[1]

    const decoded = jwt.verify(
      token,
      env.JWT_ACCESS_SECRET
    )

    const user = await User.findById(decoded.userId)

    if (!user) {
      throw new ApiError(401, 'User not found')
    }

    req.user = user

    next()
  } catch (error) {
    next(error)
  }
}