const passport = require('passport')
const BCA = require('../app/models/BCA')
const auth = require('../app/middleware/auth')
const JwtStrategy = require('passport-jwt').Strategy

/**
 * Extracts token from: header, body or query
 * @param {Object} req - request object
 * @returns {string} token - decrypted token
 */
const jwtExtractor = (req) => {
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
    token = auth.decrypt(token)
  }
  return token
}

/**
 * Options object for jwt middlware
 */
const jwtOptions = {
  jwtFromRequest: jwtExtractor,
  secretOrKey: process.env.JWT_SECRET
}

/**
 * Login with JWT middleware
 */
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    let user

    // Define an array of collection models to search
    const collectionsToSearch = [BCA]

    // Loop through the collections and search for the user
    for (const collection of collectionsToSearch) {
      user = await collection.findById(payload.data._id)

      if (user) {
        // If user is found, break out of the loop
        break
      }
    }

    // If user is still not found, return false
    return !user ? done(null, false) : done(null, user)
  } catch (error) {
    return done(error, false)
  }
})

passport.use(jwtLogin)
