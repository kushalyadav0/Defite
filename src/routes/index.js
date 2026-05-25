import express from 'express'
import cmsRoutes from '../modules/cms/cms.routes.js'
import healthRoutes from '../modules/health/health.routes.js'
import authRoutes from '../modules/auth/auth.routes.js'
import settingsRoutes from '../modules/settings/settings.routes.js'
import uploadRoutes from '../modules/upload/upload.routes.js'

const router = express.Router()

router.use('/health', healthRoutes)

router.use('/auth', authRoutes)

router.use('/cms', cmsRoutes)

router.use('/settings', settingsRoutes)

router.use('/upload', uploadRoutes)

export default router