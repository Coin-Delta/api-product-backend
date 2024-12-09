const BCA = require('../../models/BCA')
const { updateItem } = require('../../middleware/db/updateItem')
const { encryptPassword } = require('../../middleware/auth')

const updateBCA = async (req, res) => {
  try {
    const BCAId = req.params.id
    const BCAData = req.body

    // if (BCAData.password) {
    //   BCAData.password = await encryptPassword(BCAData.password)
    // }

    const updatedBCA = await updateItem(BCAId, BCA, BCAData)
    res.json(updatedBCA)
  } catch (err) {
    res.status(500).json({ error: 'Failed to update the BCA.' })
  }
}

module.exports = { updateBCA }
