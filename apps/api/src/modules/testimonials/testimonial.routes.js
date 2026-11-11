import express from 'express'

import {
  createTestimonialController,
  getTestimonialsController,
  updateTestimonialController,
  deleteTestimonialController,
} from './testimonial.controller.js'

import { protect } from '../../middleware/auth.middleware.js'

import { authorize } from '../../middleware/role.middleware.js'

import { USER_ROLES } from '../auth/auth.constants.js'

const router = express.Router()

// Public
router.get('/', getTestimonialsController)

// Admin
router.post(
  '/',
  protect,
  authorize(USER_ROLES.ADMIN),
  createTestimonialController
)

router.patch(
  '/:id',
  protect,
  authorize(USER_ROLES.ADMIN),
  updateTestimonialController
)

router.delete(
  '/:id',
  protect,
  authorize(USER_ROLES.ADMIN),
  deleteTestimonialController
)

export default router