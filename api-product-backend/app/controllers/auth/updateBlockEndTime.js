const User = require('../../models/user')
const BCA = require('../../models/BCA')
const Company = require('../../models/company')
const Vendor = require('../../models/vendor')

const updateBlockEndTimeForUserType = async (model, email, blockEndTime) => {
  const user = await model.findOne({ email })
  if (user) {
    user.otpBlockEndTime = blockEndTime
    await user.save()
    return true
  }
  return false
}

const updateBlockEndTime = async (req, res) => {
  try {
    const { email, otpBlockEndTime } = req.body

    // Check User model
    if (await updateBlockEndTimeForUserType(User, email, otpBlockEndTime)) {
      res.status(200).json({ msg: 'blockEndTime updated in User collection' })
      return
    }

    // Check BCA model
    if (await updateBlockEndTimeForUserType(BCA, email, otpBlockEndTime)) {
      res.status(200).json({ msg: 'blockEndTime updated in BCA collection' })
      return
    }

    // Check Company model
    if (await updateBlockEndTimeForUserType(Company, email, otpBlockEndTime)) {
      res
        .status(200)
        .json({ msg: 'blockEndTime updated in Company collection' })
      return
    }

    // Check Vendor model
    if (await updateBlockEndTimeForUserType(Vendor, email, otpBlockEndTime)) {
      res.status(200).json({ msg: 'blockEndTime updated in Vendor collection' })
      return
    }

    res.status(404).json({ msg: 'Email not found in any collection' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Failed to update blockTime.' })
  }
}

module.exports = { updateBlockEndTime }
