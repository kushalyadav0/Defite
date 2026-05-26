import express from 'express'

import {
  createProjectController,
  getProjectsController,
  updateProjectController,
  deleteProjectController,
} from './project.controller.js'

import { protect } from '../../middleware/auth.middleware.js'

import { authorize } from '../../middleware/role.middleware.js'

import { USER_ROLES } from '../auth/auth.constants.js'

const router = express.Router()

// Public
router.get('/', getProjectsController)

// Admin
router.post(
  '/',
  protect,
  authorize(USER_ROLES.ADMIN),
  createProjectController
)

router.patch(
  '/:id',
  protect,
  authorize(USER_ROLES.ADMIN),
  updateProjectController
)

router.delete(
  '/:id',
  protect,
  authorize(USER_ROLES.ADMIN),
  deleteProjectController
)

export default router