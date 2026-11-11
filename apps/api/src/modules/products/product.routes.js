import express from 'express'
import {
  getProductsController,
  getAdminProductsController,
  createProductController,
  updateProductController,
  deleteProductController,
} from './product.controller.js'
import { protect } from '../../middleware/auth.middleware.js'
import { authorize } from '../../middleware/role.middleware.js'
import { USER_ROLES } from '../auth/auth.constants.js'

const router = express.Router()
const adminOnly = [protect, authorize(USER_ROLES.ADMIN)]

router.get('/', getProductsController)
router.get('/admin', ...adminOnly, getAdminProductsController)
router.post('/', ...adminOnly, createProductController)
router.patch('/:id', ...adminOnly, updateProductController)
router.delete('/:id', ...adminOnly, deleteProductController)

export default router
