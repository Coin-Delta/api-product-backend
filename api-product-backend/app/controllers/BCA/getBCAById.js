const BCA = require('../../models/BCA')
const { isIDGood, handleError } = require('../../middleware/utils')

/**
 * Get user document by user ID function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getBCAById = async (req, res) => {
  try {
    // const id = await isIDGood(req.params.id)
    const item = await BCA.findById({ _id: req.params.id })
    res.status(200).json(item)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getBCAById }
