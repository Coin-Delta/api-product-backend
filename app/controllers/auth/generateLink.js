const jwt = require('jsonwebtoken')
const { sendVerificationLink } = require('./sendEmail')

const generateLink = async (req, res) => {
  try {
    const email = req.body.email
    const verificationId = req.body.verificationId

    const expirationDate = new Date()
    expirationDate.setMinutes(new Date().getMinutes() + 45)
    const token = jwt.sign(
      { email, verificationId, expirationDate },
      process.env.JWT_SECRET
    )

    const sendEmail = {
      email: email,
      url: `${req.body.url}verifyEmail/${token}`
    }

    await sendVerificationLink({ body: sendEmail }, res)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'error on hitting' })
  }
}
module.exports = { generateLink }
