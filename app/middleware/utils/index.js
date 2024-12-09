const { buildErrObject } = require('./buildErrObject')
const { buildSuccObject } = require('./buildSuccObject')
const { getBrowserInfo } = require('./getBrowserInfo')
const { getCountry } = require('./getCountry')
const { getIP } = require('./getIP')
const { handleError } = require('./handleError')
const { isIDGood } = require('./isIDGood')
const { itemNotFound } = require('./itemNotFound')
const { removeExtensionFromFile } = require('./removeExtensionFromFile')
const { validateResult } = require('./validateResult')
const {
  uploadToS3,
  uploadFile,
  deleteFromS3,
  // getSignedUrl
} = require('./uploadToS3')
const { getActiveViewerFromGA } = require('./getActiveViewerFromGA')

module.exports = {
  buildErrObject,
  buildSuccObject,
  getBrowserInfo,
  getCountry,
  getIP,
  handleError,
  isIDGood,
  itemNotFound,
  removeExtensionFromFile,
  validateResult,
  uploadToS3,
  uploadFile,
  deleteFromS3,
  getActiveViewerFromGA,
  // getSignedUrl
}
