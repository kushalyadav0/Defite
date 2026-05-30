import express from 'express'
import { uploadImage } from './upload.controller.js'
import { upload } from '../../config/multer.js'
import { protect } from '../../middleware/auth.middleware.js'
import { authorize } from '../../middleware/role.middleware.js'
import { USER_ROLES } from '../auth/auth.constants.js'

const router = express.Router()

router.post(
  '/',
  protect,
  authorize(USER_ROLES.ADMIN),
  upload.single('image'),
  uploadImage
)

export default router