import {
  registerUser,
  loginUser,
} from './auth.service.js'

import {
  registerValidation,
  loginValidation,
} from './auth.validation.js'

import { asyncHandler } from '../../utils/asyncHandler.js'

import { sendResponse } from '../../utils/response.js'

export const register = asyncHandler(async (req, res) => {
  const validatedData = registerValidation.parse(req.body)

  const user = await registerUser(validatedData)

  return sendResponse({
    res,
    statusCode: 201,
    message: 'User registered successfully',
    data: user,
  })
})

export const login = asyncHandler(async (req, res) => {
  const validatedData = loginValidation.parse(req.body)

  const data = await loginUser(validatedData)

  return sendResponse({
    res,
    message: 'Login successful',
    data,
  })
})

export const getMe = asyncHandler(async (req, res) => {
  return sendResponse({
    res,
    message: 'Profile fetched successfully',
    data: req.user,
  })
})