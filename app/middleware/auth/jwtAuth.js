// middleware/jwtAuth.js
const jwt = require('jsonwebtoken')
const BCA = require('../../models/BCA')
// const { createTransaction } = require('../../services/transactionService.js')
const TransactionService = require('../../services/transactionService.js')

/**
 * Extracts token from: header, body or query
 * @param {Object} req - request object
 * @returns {string} token - decrypted token
 */
const extractToken = (req) => {
  let token = null

  if (req.headers.authorization) {
    token = req.headers.authorization.replace('Bearer ', '').trim()
  } else if (req.body.token) {
    token = req.body.token.trim()
  } else if (req.query.token) {
    token = req.query.token.trim()
  }

  return token
}

/**
 * Verifies JWT and checks user existence in BCA collection
 */
const verifyJWT = async (req, res, next) => {
  try {
    const token = extractToken(req)

    if (!token) {
      return res.status(401).json({
        error: 'Access denied. No token provided.'
      })
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    console.log('decoded token:', decoded)

    const permission = decoded?.claims?.includes('access_api_catalog')

    try {
      if (!permission) {
        await TransactionService.createTransaction({
          clientId: decoded.bcaId,
          initiatedBy: decoded.userId,
          initiatedByRoleId: decoded.roleId
        })
        return res.status(403).json({
          error: 'You do not have permission to access API Product.'
        })
      }
    } catch (errror) {
      console.error(
        'error logging unauthorized access entry in transaction:',
        errror
      )
      return res.status(403).json({
        error: 'You do not have permission to access API Product.'
      })
    }

    // Find user in BCA collection
    const user = await BCA.findById(decoded.bcaId)

    if (!user) {
      return res.status(404).json({
        error: 'User not found in BCA collection.'
      })
    }

    // Attach decoded token data and user to request
    req.user = {
      userId: decoded.userId,
      roleId: decoded.roleId,
      clients: decoded.clients,
      checks: decoded.checks,
      bcaId: decoded.bcaId,
      companyId: decoded.companyId,
      entityType: decoded.entityType,
      isSuperAdmin: decoded.isSuperAdmin,
      permissions: decoded.permissions,
      claims: decoded.claims,
      // You can add additional user data from the BCA collection if needed
      bcaData: user
    }
    console.log('jwt auth req.user:', req.user)

    next()
    return
  } catch (err) {
    console.log('JWT Verification Error:', err)

    if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({
        error: 'Invalid token.'
      })
    } else if (err.name === 'TokenExpiredError') {
      return res.status(403).json({
        error: 'Token has expired.'
      })
    }

    return res.status(500).json({
      error: 'Internal server error during authentication.'
    })
  }
}

module.exports = verifyJWT
