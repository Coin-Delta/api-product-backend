const { createBCA } = require('./createBCA')
const { updateBCA } = require('./updateBCA')
const { getBCA } = require('./getBCA')
const { getBCAById } = require('./getBCAById')
const { generateApiKey } = require('./generateApiKey')
const { deleteMember } = require('./deleteMember')

module.exports = {
  createBCA,
  updateBCA,
  getBCA,
  getBCAById,
  generateApiKey,
  deleteMember
}
