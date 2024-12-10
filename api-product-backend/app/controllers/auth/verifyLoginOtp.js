const User = require('../../models/user')
const BCA = require('../../models/BCA')
const company = require('../../models/company')
const vendor = require('../../models/vendor')
const { saveUserAccessAndReturnToken, getDataFromDB } = require('./helpers')

const verifyLoginOtp = async (req, res) => {
  try {
    const userData = await getDataFromDB(
      { email: req.body.email, verificationCode: req.body.verificationCode },
      User
    )
    if (userData.length == 0) {
      const BCAData = await getDataFromDB(
        { email: req.body.email, verificationCode: req.body.verificationCode },
        BCA
      )
      if (BCAData.length == 0) {
        const companyData = await getDataFromDB(
          {
            email: req.body.email,
            verificationCode: req.body.verificationCode
          },
          company
        )
        if (companyData.length == 0) {
          const vendorData = await getDataFromDB(
            {
              email: req.body.email,
              verificationCode: req.body.verificationCode
            },
            vendor
          )
          if (vendorData.length == 0) {
            res.status(400).json({ msg: 'OTP Mismatch' })
          } else {
            if (vendorData[0].verificationCodeTimestamp) {
              const currentTimestamp = Date.now()
              const expirationTimeLimit = 5 * 60 * 1000 // 5 minutes in milliseconds

              // Calculate the timestamp with the expiration limit
              const storedTimestamp =
                vendorData[0].verificationCodeTimestamp.getTime()

              // Calculate the timestamp with the expiration limit
              const expirationTimestamp = storedTimestamp + expirationTimeLimit

              // Check if the provided timestamp exceeds the expiration limit
              if (req.body.verificationCodeTimestamp > expirationTimestamp) {
                res.status(400).json({ msg: 'OTP expired' })
                return
              } else if (
                vendorData[0].otpBlockEndTime &&
                vendorData[0].otpBlockEndTime > currentTimestamp
              ) {
                res.status(400).json({ msg: 'Attempt Limit Exceed!!' })
                return
              }
            }
            // Proceed with the OTP verification if not expired
            delete vendorData[0].verificationCodeTimestamp
            delete vendorData[0].verificationCode
            delete vendorData[0].userName
            delete vendorData[0].password
            res
              .status(201)
              .json(await saveUserAccessAndReturnToken(req.body, vendorData[0]))
          }
        } else {
          if (companyData[0].verificationCodeTimestamp) {
            const currentTimestamp = Date.now()
            const expirationTimeLimit = 5 * 60 * 1000 // 5 minutes in milliseconds

            // Calculate the timestamp with the expiration limit
            const storedTimestamp =
              companyData[0].verificationCodeTimestamp.getTime()

            // Calculate the timestamp with the expiration limit
            const expirationTimestamp = storedTimestamp + expirationTimeLimit

            // Check if the provided timestamp exceeds the expiration limit
            if (req.body.verificationCodeTimestamp > expirationTimestamp) {
              res.status(400).json({ msg: 'OTP expired' })
              return
            } else if (
              companyData[0].otpBlockEndTime &&
              companyData[0].otpBlockEndTime > currentTimestamp
            ) {
              res.status(400).json({ msg: 'Attempt Limit Exceed!!' })
              return
            }
          }
          // Proceed with the OTP verification if not expired
          delete companyData[0].verificationCodeTimestamp
          delete companyData[0].verificationCode
          delete companyData[0].userName
          delete companyData[0].password
          res
            .status(201)
            .json(await saveUserAccessAndReturnToken(req.body, companyData[0]))
        }
      } else {
        if (BCAData[0].verificationCodeTimestamp) {
          const currentTimestamp = Date.now()
          const expirationTimeLimit = 5 * 60 * 1000 // 5 minutes in milliseconds
          // Calculate the timestamp with the expiration limit
          const storedTimestamp = BCAData[0].verificationCodeTimestamp.getTime()

          // Calculate the timestamp with the expiration limit
          const expirationTimestamp = storedTimestamp + expirationTimeLimit

          // Check if the provided timestamp exceeds the expiration limit
          if (req.body.verificationCodeTimestamp > expirationTimestamp) {
            res.status(400).json({ msg: 'OTP expired' })
            return
          } else if (
            BCAData[0].otpBlockEndTime &&
            BCAData[0].otpBlockEndTime > currentTimestamp
          ) {
            res.status(400).json({ msg: 'Attempt Limit Exceed!!' })
            return
          }
        }

        // Proceed with the OTP verification if not expired
        delete BCAData[0].verificationCodeTimestamp
        delete BCAData[0].verificationCode
        delete BCAData[0].userName
        delete BCAData[0].password

        res
          .status(201)
          .json(await saveUserAccessAndReturnToken(req.body, BCAData[0]))
      }
    } else {
      if (userData[0].verificationCodeTimestamp) {
        const currentTimestamp = Date.now()
        const expirationTimeLimit = 5 * 60 * 1000 // 5 minutes in milliseconds

        // Calculate the timestamp with the expiration limit
        const storedTimestamp = userData[0].verificationCodeTimestamp.getTime()

        // Calculate the timestamp with the expiration limit
        const expirationTimestamp = storedTimestamp + expirationTimeLimit

        // Check if the provided timestamp exceeds the expiration limit
        if (req.body.verificationCodeTimestamp > expirationTimestamp) {
          res.status(400).json({ msg: 'OTP expired' })
          return
        } else if (
          userData[0].otpBlockEndTime &&
          userData[0].otpBlockEndTime > currentTimestamp
        ) {
          res.status(400).json({ msg: 'Attempt Limit Exceed!!' })
          return
        }
      }

      // Proceed with the OTP verification if not expired
      delete userData[0].verificationCodeTimestamp
      delete userData[0].verificationCode
      delete userData[0].userName
      delete userData[0].password
      res
        .status(201)
        .json(await saveUserAccessAndReturnToken(req.body, userData[0]))
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Failed to user login.' })
  }
}

module.exports = { verifyLoginOtp }
