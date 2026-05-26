import express from 'express'

import {
  createContact,
  getAllContacts,
} from './contact.controller.js'

import { protect } from '../../middleware/auth.middleware.js'

import { authorize } from '../../middleware/role.middleware.js'

import { USER_ROLES } from '../auth/auth.constants.js'

const router = express.Router()

// Public
router.post('/', createContact)

// Admin
router.get(
  '/',
  protect,
  authorize(USER_ROLES.ADMIN),
  getAllContacts
)

export default router