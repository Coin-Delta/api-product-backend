const { itemNotFound, isIDGood } = require('../../middleware/utils')
const { ObjectId } = require('mongodb')
/**
 * Gets item from database by id
 * @param {string} id - item id
 */
const getItemVerified = async (id = '', model = {}) => {
  const isObjectId = ObjectId.isValid(id)
  let item

  if (isObjectId) {
    const searchByid = await isIDGood(id)
    item = await model
      .find({ _id: new ObjectId(searchByid) })
      .populate('userId')
      .lean()
  } else {
    item = await model
      .find({ tokenName: { $regex: new RegExp(id, 'i') } })
      .populate('userId')
      .lean()
  }

  await itemNotFound(null, item, 'NOT_FOUND')

  return item
}

module.exports = { getItemVerified }
