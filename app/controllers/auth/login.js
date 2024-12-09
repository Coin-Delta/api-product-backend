const User = require('../../models/user')
const BCA = require('../../models/BCA')
const Company = require('../../models/company')
const {
  getDataFromDB,
  updateDataInDBbyId,
  saveUserAccessAndReturnToken
} = require('./helpers')
const { handleError } = require('../../middleware/utils')
const { sendLoginOTP } = require('./sendEmail')
const { decryptPassword } = require('../../middleware/auth')

/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const login = async (req, res) => {
  try {
    let userData
    let userModel

    if (req.body.email) {
      userData = await getDataFromDB({ email: req.body.email }, Company)
      userModel = Company
      if (userData.length !== 0) {
        const returnUserData = await sendOTPandUpdateUserData(userData)
        const { _doc } = returnUserData

        const { userName, password, verificationCode, ...returnableUserData } =
          _doc

        return res.status(200).json(returnableUserData)
      }

      userData = await getDataFromDB({ email: req.body.email }, BCA)
      userModel = BCA
      if (userData.length !== 0) {
        const returnUserData = await sendOTPandUpdateUserData(userData)
        const { _doc } = returnUserData

        const { userName, password, verificationCode, ...returnableUserData } =
          _doc

        return res.status(200).json(returnableUserData)
      }

      // Check if email exists in the user collection
      userData = await getDataFromDB({ email: req.body.email }, User)
      userModel = User
      if (userData.length !== 0) {
        const returnUserData = await sendOTPandUpdateUserData(userData)
        const { _doc } = returnUserData

        const { userName, password, verificationCode, ...returnableUserData } =
          _doc

        return res.status(200).json(returnableUserData)
      }

      // If email not found in any collection
      return res
        .status(500)
        .json({ error: 'This email is not registered with us.' })
    }
    // Check if userName and password are provided
    else if (req.body.userName && req.body.password) {
      let userModel
      let userData
      userData = await getDataFromDB({ userName: req.body.userName }, Company)
      if (userData.length !== 0 && userData[0].email) {
        // If email exists, send OTP
        const returnUserData = await sendOTPandUpdateUserData(userData)
        const { _doc } = returnUserData
        const { userName, password, verificationCode, ...returnableUserData } =
          _doc
        return res.status(200).json(returnableUserData)
      }

      // Check if userName exists in the company collection
      userData = await getDataFromDB({ userName: req.body.userName }, Company)
      userModel = Company
      if (userData.length !== 0) {
        // Verify password
        const passwordMatch = await decryptPassword(
          req.body.password,
          userData[0].password
        )
        if (passwordMatch) {
          return res
            .status(201)
            .json(await saveUserAccessAndReturnToken(req.body, userData[0]))
        } else {
          return res.status(400).json({ error: 'Invalid credentials' })
        }
      }

      userData = await getDataFromDB({ userName: req.body.userName }, BCA)

      if (userData.length !== 0 && userData[0].email) {
        // If email exists, send OTP
        const returnUserData = await sendOTPandUpdateUserData(userData)

        const { _doc } = returnUserData
        const { userName, password, verificationCode, ...returnableUserData } =
          _doc

        return res.status(200).json(returnableUserData)
      }

      // Check if userName exists in the BCA collection
      userData = await getDataFromDB({ userName: req.body.userName }, BCA)
      userModel = BCA
      if (userData.length !== 0) {
        // Verify password
        const passwordMatch = await decryptPassword(
          req.body.password,
          userData[0].password
        )

        if (passwordMatch) {
          return res
            .status(201)
            .json(await saveUserAccessAndReturnToken(req.body, userData[0]))
        } else {
          return res.status(400).json({ error: 'Invalid credentials' })
        }
      }

      userData = await getDataFromDB({ userName: req.body.userName }, User)
      if (userData.length !== 0 && userData[0].email) {
        // If email exists, send OTP
        const returnUserData = await sendOTPandUpdateUserData(userData)
        const { _doc } = returnUserData
        const { userName, password, verificationCode, ...returnableUserData } =
          _doc
        return res.status(200).json(returnableUserData)
      }

      // Check if userName exists in the user collection
      userData = await getDataFromDB({ userName: req.body.userName }, User)
      userModel = User
      if (userData.length !== 0) {
        // Verify password
        const passwordMatch = await decryptPassword(
          req.body.password,
          userData[0].password
        )

        if (passwordMatch) {
          return res
            .status(201)
            .json(await saveUserAccessAndReturnToken(req.body, userData[0]))
        } else {
          return res.status(400).json({ error: 'Invalid credentials' })
        }
      }

      // If userName not found in any collection
      return res
        .status(500)
        .json({ error: 'This username is not registered with us.' })
    } else {
      return res
        .status(400)
        .json({ error: 'Email or userName and password are required.' })
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
  const emailSendRes = await sendLoginOTP({ body: emailBody })
  if (emailSendRes.verificationCode) {
    const query = {
      verificationCode: emailSendRes.verificationCode,
      verificationCodeTimestamp: emailSendRes.verificationCodeTimestamp
    }
    let updateUserData
    if (userObject.role == 'user') {
      updateUserData = await updateDataInDBbyId(userObject._id, User, query)
    } else if (
      userObject.role == 'BCA' ||
      userObject.role == 'Vendor' ||
      userObject.role == 'Coordinator' ||
      userObject.role == 'BCAStaff' ||
      userObject.role == 'DataEntry' ||
      userObject.role == 'Auditor' ||
      userObject.role == 'CCTAdmin' ||
      userObject.role == 'FieldCoordinator'
    ) {
      updateUserData = await updateDataInDBbyId(userObject._id, BCA, query)
    } else if (userObject.role == 'company') {
      updateUserData = await updateDataInDBbyId(userObject._id, Company, query)
    } else if (userObject.role == 'Vendor') {
      updateUserData = await updateDataInDBbyId(userObject._id, vendor, query)
    }
    return updateUserData
  } else {
    console.error(
      'Verification code not generated in emailSendRes:',
      emailSendRes
    )
  }
}

module.exports = { login }
