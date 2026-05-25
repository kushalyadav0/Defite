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

app.use(helmet())

app.use(cors())
app.use(compression())
app.use(morgan('dev'))
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  '/uploads',
  express.static(
    path.join(process.cwd(), 'src/uploads')
  )
)

app.use('/api/v1', routes)

app.use(notFoundMiddleware)

app.use(errorMiddleware)



export default app