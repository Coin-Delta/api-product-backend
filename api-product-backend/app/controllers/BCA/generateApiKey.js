const crypto = require('crypto')
const Company = require('../../models/company')

/**
 * Generates a random API key of the specified length
 * @param {number} length - The length of the API key in bytes (default is 32 bytes)
 * @returns {string} - The generated API key in hexadecimal format
 */
function generateKey(length = 32) {
  return crypto.randomBytes(length).toString('hex')
}

const generateApiKey = async (req, res) => {
  try {
    const companyId = req.params.id

    console.log('companyId>>', companyId)

    // Generate random API key
    const apiKey = generateKey()

    console.log('apiKey>>', apiKey)

    // Find company by companyId and update apiKeyRequest
    const updatedCompany = await Company.findOneAndUpdate(
      { _id: companyId, 'apiKeyRequest.requestStatus': 'Pending' },
      {
        'apiKeyRequest.apiKey': apiKey,
        'apiKeyRequest.requestStatus': 'Generated'
      },
      { new: true }
    )

    if (!updatedCompany) {
      return res.status(404).json({
        error: 'Company not found or API Key Request already generated'
      })
    }

    res.status(200).json({
      message: 'API key generated and updated successfully',
      apiKeyRequest: updatedCompany.apiKeyRequest
    })
  } catch (err) {
    res.status(500).json({
      error: 'Failed to generate API key and update records.',
      message: err.message
    })
  }
}

module.exports = { generateApiKey }
