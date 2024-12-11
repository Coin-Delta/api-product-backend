require('dotenv-safe').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const passport = require('passport')
const i18n = require('i18n')
const initMongo = require('./config/mongo')
const path = require('path')
const rateLimit = require('express-rate-limit')
const { geoInfo } = require('./app/middleware/geo/geoInfo')
const {
  invalidateToken,
  isTokenInvalidated
} = require('./app/services/TokenServices')
const ApiService = require('./app/services/apiService.js')
const { API_TYPES } = require('./app/constants/apiTypes.js')
const { ObjectId } = require('mongodb') // Import ObjectId

const app = express()

// Setup express server port from ENV, default: 3000
app.set('port', process.env.PORT || 3000)

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

// Apply middleware in the correct order
app.use(cors())
app.use(
  helmet({
    xssFilter: false
  })
)

// Custom XSS Protection
app.use((req, res, next) => {
  const originalSetHeader = res.setHeader
  res.setHeader = function (name, value) {
    if (name === 'X-XSS-Protection' && value !== '1; mode=block') {
      console.warn(`Attempt to set X-XSS-Protection to ${value} was blocked`)
      return
    }
    originalSetHeader.apply(this, arguments)
  }
  res.setHeader('X-XSS-Protection', '1; mode=block')
  next()
})

// Compression middleware
app.use(compression())

// Static files
app.use(express.static('public'))

// HTTP request logger middleware only in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Body parser middleware
app.use(bodyParser.json({ limit: '20mb' }))
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }))

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 1000 // limit each IP to 500 requests per windowMs
})
app.use(limiter)

// i18n configuration
i18n.configure({
  locales: ['en', 'es'],
  directory: `${__dirname}/locales`,
  defaultLocale: 'en',
  objectNotation: true
})
app.use(i18n.init)

// Geo info middleware
app.use(geoInfo)

// Passport initialization
app.use(passport.initialize())

// Token invalidation check middleware
app.use((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (isTokenInvalidated(token)) {
    return res.status(401).json({ message: 'Token is invalidated' })
  }
  next()
})

// Disable compression for sensitive responses and add random data padding
app.use((req, res, next) => {
  res.set('Content-Encoding', 'identity')
  const padding = ' '.repeat(Math.floor(Math.random() * 100))
  res.set('X-Random-Padding', padding)
  next()
})

// Health check route
app.get('/health', (req, res) => {
  res.json({ ok: 1 })
})

// Token invalidation endpoint
app.post('/invalidate-token', (req, res) => {
  const { token } = req.body
  if (!token) {
    return res.status(400).json({ message: 'Token is required' })
  }
  invalidateToken(token)
  res.status(200).json({ message: 'Token invalidated' })
})

// Main routes
app.use(require('./app/routes'))

// Start server
app.listen(app.get('port'))

// Init MongoDB
initMongo()

// testing code
ApiService.processDocumentAndUpdateBalance({
  apiType: API_TYPES.AADHAAR,
  price: 2.5,
  documentData: { id_number: '978079091700' },
  apiId: new ObjectId('6757fbef7d92daaeb840777d'),
  vendorId: new ObjectId('6757fad87d92daaeb840777b'),
  clientId: new ObjectId('674c8479f48dc9215a5087f2')
})

module.exports = app // for testing
