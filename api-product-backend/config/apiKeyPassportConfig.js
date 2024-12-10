const passport = require('passport')
const Company = require('../app/models/company')
const JwtStrategy = require('passport-jwt').Strategy
const crypto = require('crypto')

const secret = process.env.APIKEY_JWT_SECRET
const algorithm = 'aes-256-cbc'
const key = crypto.scryptSync(secret, 'salt', 32)
const iv = Buffer.alloc(16, 0)

const decryptApiKey = (text = '') => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv)

  try {
    let decrypted = decipher.update(text, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
  } catch (err) {
    return err
  }
}

/**
 * Extracts token from: header, body or query
 * @param {Object} req - request object
 * @returns {string} token - decrypted token
 */
const apiKeyJwtExtractor = (req) => {
  let token = null
  if (req.headers.authorization) {
    token = req.headers.authorization.replace('Bearer ', '').trim()
  } else if (req.body.token) {
    token = req.body.token.trim()
  } else if (req.query.token) {
    token = req.query.token.trim()
  }
  if (token) {
    // Decrypts token
    token = decryptApiKey(token)
  }
  console.log(token, '<<<TOKEN>>>')
  return token
}

/**
 * Options object for jwt middleware
 */
const jwtOptions = {
  jwtFromRequest: apiKeyJwtExtractor,
  secretOrKey: process.env.APIKEY_JWT_SECRET
}

/**
 * Login with JWT middleware using Company model only
 */
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const { _id, apiKey, BCAId } = payload.data
    console.log(payload.data, '{<><><>PAY</></>}')

    if (!apiKey) {
      return done(null, false)
    }

    const company = await Company.findOne({
      _id,
      'apiKeyRequest.apiKey': apiKey,
      BCAId
    })

    if (!company) {
      return done(null, false)
    }

    return done(null, company, { payload })
  } catch (error) {
    return done(error, false)
  }
})

passport.use('apiKey', jwtLogin)
