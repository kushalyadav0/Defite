import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import path from 'path'
import routes from './routes/index.js'
import { errorMiddleware } from './middleware/error.middleware.js'
import { notFoundMiddleware } from './middleware/notFound.middleware.js'
import { ensureReady } from './config/bootstrap.js'

const app = express()

app.set('trust proxy', 1)

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: 'cross-origin',
    },
  })
)

// Sites allowed to call the API from a browser. Add more with CORS_ORIGINS
// (comma-separated) in the environment.
const allowedOrigins = [
  'https://defite.in',
  'https://www.defite.in',
  'https://admin.defite.in',
  'http://localhost:5173',
  'http://localhost:5174',
  ...(process.env.CORS_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
]

app.use(
  cors({
    origin: (origin, callback) => {
      // Same-origin requests and tools like curl send no Origin header.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }
      // Vercel preview deployments of this team's projects.
      if (/^https:\/\/[a-z0-9-]+-zeros-744693ac\.vercel\.app$/.test(origin)) {
        return callback(null, true)
      }
      return callback(null, false)
    },
    credentials: true,
  })
)

app.use(compression())

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  '/uploads',
  express.static(
    path.join(process.cwd(), 'src/uploads')
  )
);

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Defite API' })
})

// Make sure MongoDB is connected (and seeded once) before any API route runs.
app.use('/api/v1', async (req, res, next) => {
  try {
    await ensureReady()
    next()
  } catch (error) {
    next(error)
  }
})

app.use('/api/v1', routes)
app.use(notFoundMiddleware)
app.use(errorMiddleware)

export default app