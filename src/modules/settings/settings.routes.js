import express from 'express'

import {
  getSettingsController,
  updateSettingsController,
} from './settings.controller.js'

import { protect } from '../../middleware/auth.middleware.js'

import { authorize } from '../../middleware/role.middleware.js'

import { USER_ROLES } from '../auth/auth.constants.js'

const router = express.Router()

// Public
router.get('/', getSettingsController)

// Admin
router.patch(
  '/',
  protect,
  authorize(USER_ROLES.ADMIN),
  updateSettingsController
)

export default router