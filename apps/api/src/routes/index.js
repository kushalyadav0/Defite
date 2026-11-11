import express from 'express'
import cmsRoutes from '../modules/cms/cms.routes.js'
import healthRoutes from '../modules/health/health.routes.js'
import authRoutes from '../modules/auth/auth.routes.js'
import settingsRoutes from '../modules/settings/settings.routes.js'
import uploadRoutes from '../modules/upload/upload.routes.js'
import contactRoutes from '../modules/contact/contact.routes.js'
import projectRoutes from '../modules/projects/project.routes.js'
import productRoutes from '../modules/products/product.routes.js'
import testimonialRoutes from '../modules/testimonials/testimonial.routes.js'

const router = express.Router()

router.use('/health', healthRoutes)
router.use('/auth', authRoutes)
router.use('/cms', cmsRoutes)
router.use('/settings', settingsRoutes)
router.use('/upload', uploadRoutes)
router.use('/contact', contactRoutes)
router.use('/projects', projectRoutes)
router.use('/products', productRoutes)
router.use('/testimonials', testimonialRoutes)
router.use('/cms', cmsRoutes);

export default router