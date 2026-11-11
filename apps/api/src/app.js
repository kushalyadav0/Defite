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

const app = express()

app.set('trust proxy', 1)

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: 'cross-origin',
    },
  })
)

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
    ],
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

app.use('/api/v1', routes)
app.use(notFoundMiddleware)
app.use(errorMiddleware)

export default app