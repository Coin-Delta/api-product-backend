const jwt = require('jsonwebtoken')
const BCA = require('../../models/BCA')
const InternalUser = require('../../models/internalUser')
const TransactionService = require('../../services/transactionService.js')

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

    let user = null

    // Check if the token is for an internal user (CCT-ADMIN)
    if (decoded.userType === 'CCT-ADMIN') {
      user = await InternalUser.findById(decoded._id)

      if (!user) {
        return res.status(404).json({
          error: 'Internal user not found.'
        })
      }

      // Set user data for internal users
      req.user = {
        userId: user._id,
        email: user.email,
        userType: 'CCT-ADMIN'
        // Add any additional internal user specific data here
      }
    } else {
      // Existing BCA user flow
      const permission = decoded.permissions['canAccessAPIProduct']

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
      } catch (error) {
        console.error(
          'error logging unauthorized access entry in transaction:',
          error
        )
        return res.status(403).json({
          error: 'You do not have permission to access API Product.'
        })
      }

      // Find user in BCA collection
      user = await BCA.findById(decoded.bcaId)

      if (!user) {
        return res.status(404).json({
          error: 'User not found in BCA collection.'
        })
      }

      // Set user data for BCA users
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
        bcaData: user
      }
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
