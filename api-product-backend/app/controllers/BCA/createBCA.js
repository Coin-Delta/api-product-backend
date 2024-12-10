const BCA = require('../../models/BCA')
const { createItem } = require('../../middleware/db/createItem')
const { matchedData } = require('express-validator')
const { sendVerificationEmail } = require('../auth')
const { updateBCAOtpCode } = require('./helpers/updateBCAOtpCode')
const { checkUserEmail } = require('../auth/helpers')

const createBCA = async (req, res) => {
  try {
    const data = matchedData(req)
    data.role = 'BCA'
    const checkUser = await checkUserEmail({ email: data.email })
    if (checkUser.length != 0) {
      res
        .status(500)
        .json({ error: 'BCA is already Register with this email address.' })
    } else {
      const savedUser = await createItem(data, BCA)
      res.status(200).json(savedUser)
      if (savedUser._id) {
        const emailBody = {
          email: savedUser.email
        }
        const emailSendRes = await sendVerificationEmail({ body: emailBody })
        if (emailSendRes.verificationCode) {
          const query = {
            verificationCode: emailSendRes.verificationCode,
            verificationCodeTimestamp: emailSendRes.verificationCodeTimestamp
          }
          const updateCode = await updateBCAOtpCode(savedUser._id, BCA, query)
        }
      }
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to create the BCA.' })
  }
}

module.exports = { createBCA }
