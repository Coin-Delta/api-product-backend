const BCA = require('../../models/BCA')
const { getItems } = require('../../middleware/db/getItems')

const getBCA = async (req, res) => {
  try {
    const BCAs = await getItems(req, BCA,{ role: 'BCA' })
    res.json(BCAs)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch BCA.' })
  }
}

module.exports = { getBCA }
