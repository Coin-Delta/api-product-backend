const User = require('../../models/user')
const BCA = require('../../models/BCA')
const company = require('../../models/company')
const {
  saveUserAccessAndReturnToken,
  getDataFromDB,
  updateDataInDBbyId
} = require('./helpers')
const { handleError } = require('../../middleware/utils')
const { sendSignupOTP } = require('./sendEmail')
const { encryptPassword } = require('../../middleware/auth/encryptPassword')

/**
Login function called by route
@param {Object} req - request object
@param {Object} res - response object
*/
const signUp = async (req, res) => {
  try {
    // If email is provided
    if (req.body.email !== null) {
      let userData
      let userModel

      // Check if email exists in User collection
      userData = await getDataFromDB({ email: req.body.email }, User)
      userModel = User
      if (userData.length != 0) {
        const returnUserData = await sendOTPandUpdateUserData(userData)
        return res.status(200).json(returnUserData)
      }

      // Check if email exists in BCA collection
      userData = await getDataFromDB({ email: req.body.email }, BCA)
      userModel = BCA
      if (userData.length != 0) {
        const returnUserData = await sendOTPandUpdateUserData(userData)
        return res.status(200).json(returnUserData)
      }

      // Check if email exists in company collection
      userData = await getDataFromDB({ email: req.body.email }, company)
      userModel = company
      if (userData.length != 0) {
        const returnUserData = await sendOTPandUpdateUserData(userData)
        return res.status(200).json(returnUserData)
      }

      // If email not found in any collection
      return res
        .status(500)
        .json({ error: 'This email is not registered with us.' })
    }
    // If email is not provided
    else if (req.body.userName) {
      let userData
      let userModel

      // Check if userName exists in User collection
      userData = await getDataFromDB({ userName: req.body.userName }, User)
      userModel = User
      if (userData.length != 0) {
        return res.status(400).json({ error: 'Username already exists.' })
      }

      // Check if userName exists in BCA collection
      userData = await getDataFromDB({ userName: req.body.userName }, BCA)
      userModel = BCA
      if (userData.length != 0) {
        return res.status(400).json({ error: 'Username already exists.' })
      }

      // Check if userName exists in company collection
      userData = await getDataFromDB({ userName: req.body.userName }, company)
      userModel = company
      if (userData.length != 0) {
        return res.status(400).json({ error: 'Username already exists.' })
      }

      // If userName not found in any collection, proceed with sign-up
      // const encryptedPassword = await encryptPassword(req.body.password) // Encrypt password

      // Create new user object based on user role
      const newUser = new userModel({
        userName: req.body.userName,
        email: req.body.email,
        // password: encryptedPassword // Encrypted password
        password: req.body.password // Encrypted password
      })

      const savedUser = await newUser.save()
      // You can send verification email here if needed
      return res.status(200).json(savedUser)
    } else {
      return res.status(500).json({ error: 'Email or userName is required.' })
    }
  } catch (error) {
    handleError(res, error)
  }
}

const sendOTPandUpdateUserData = async (userData) => {
  const userObject = userData[0]
  const emailBody = {
    email: userObject.email
  }
  const emailSendRes = await sendSignupOTP({ body: emailBody })
  if (emailSendRes.verificationCode) {
    const query = { verificationCode: emailSendRes.verificationCode }
    if (userObject.role == 'user') {
      const updateUserData = await updateDataInDBbyId(
        userObject._id,
        User,
        query
      )
      return updateUserData
    } else if (userObject.role == 'BCA') {
      const updateUserData = await updateDataInDBbyId(
        userObject._id,
        BCA,
        query
      )
      return updateUserData
    } else if (userObject.role == 'company') {
      const updateUserData = await updateDataInDBbyId(
        userObject._id,
        company,
        query
      )
      return updateUserData
    }
  }
}

module.exports = { signUp }
