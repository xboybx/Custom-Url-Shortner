import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import { connectDB } from './src/services/db/index.js'
import urlRoutes from './src/routes/urlRoutes.js'

// Load environment variables
dotenv.config()

// Create Express app
const app = express()
const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors({
  origin: '*',
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Logging in development
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

// Routes
app.use('/urls', urlRoutes)

// Redirect route
app.get('/:shortUrl', (req, res) => {
  res.status(400).json({
    message: 'This endpoint is for the frontend to handle redirects. The backend API is at /urls/:shortUrl'
  })
})

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`)
  // Close server & exit process
  process.exit(1)
})