import express from 'express'

import {
  createPage,
  getAllPages,
  getPageBySlug,
  updatePage,
  deletePage,
} from './cms.controller.js'

import { protect } from '../../middleware/auth.middleware.js'

import { authorize } from '../../middleware/role.middleware.js'

import { USER_ROLES } from '../auth/auth.constants.js'

const router = express.Router()

// Public
router.get('/:slug', getPageBySlug)

// Admin
router.post(
  '/',
  protect,
  authorize(USER_ROLES.ADMIN),
  createPage
)

router.get(
  '/',
  protect,
  authorize(USER_ROLES.ADMIN),
  getAllPages
)

router.patch(
  '/:slug',
  protect,
  authorize(USER_ROLES.ADMIN),
  updatePage
)

router.delete(
  '/:slug',
  protect,
  authorize(USER_ROLES.ADMIN),
  deletePage
)

export default router