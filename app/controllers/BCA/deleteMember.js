const BCA = require('../../models/BCA')
const { deleteItem } = require('../../middleware/db/deleteItem')

const deleteMember = async (req, res) => {
  try {
    const memberId = req.params.id
    await deleteItem(memberId, BCA)
    res.json({ message: 'Member deleted successfully.' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete the Member.' })
  }
}

module.exports = { deleteMember }
