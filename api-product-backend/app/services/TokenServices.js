const invalidatedTokens = new Set()

function invalidateToken(token) {
  invalidatedTokens.add(token)
}

function isTokenInvalidated(token) {
  return invalidatedTokens.has(token)
}

module.exports = {
  invalidateToken,
  isTokenInvalidated
}
