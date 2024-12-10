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

module.exports = decryptApiKey // Export the function directly, not as an object
