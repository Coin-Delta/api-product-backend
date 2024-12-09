const { buildErrObject } = require('../utils/buildErrObject')
const { isKYCCountrySupported } = require('../../controllers/kyc/getKYCToken')
const { isUnsupportedGeo } = require('../utils/geo')
const userWalletsAddress = require('../../models/userWalletsAddress')

const requireSupportedGeo = async (req, res, next) => {
  // if user info
  if (req.user) {
    if (req.headers['x-connected-address']) {
      const connectedAddress = req.headers['x-connected-address']

      // Verify if connected address belongs to user, if not don't do anything
      const userWallets = await userWalletsAddress.find({
        userId: req.user.id
      })

      const found = Array.isArray(userWallets)
        ? userWallets?.find(
            (a) =>
              a.metamaskAddress.toLowerCase() === connectedAddress.toLowerCase()
          )
        : null

      // Now needs to see if it is authorized, if so go next early
      if (found && found.authorize) {
        next()
        return
      }
    }

    let isSupported = true

    // check stored userCountry
    if (req.user.userCountry) {
      isSupported = !isUnsupportedGeo({ country: req.user.userCountry })
    } else if (req.user.externalUserId) {
      isSupported = await isKYCCountrySupported(req.user.externalUserId)
    }

    // exit early if we're already not supported
    if (!isSupported) {
      return res.status(403).json(buildErrObject(403, 'Unsupported region'))
    }

    // grab user country
    const countryFromUser = req.user.userCountry

    if (isUnsupportedGeo({ country: countryFromUser })) {
      return res.status(403).json(buildErrObject(403, 'Unsupported region'))
    }
  }

  if (req.geoInfo) {
    const { country, region } = req.geoInfo

    if (isUnsupportedGeo({ country, region })) {
      return res.status(403).json(buildErrObject(403, 'Unsupported region'))
    }
  }

  next()
}

module.exports = { requireSupportedGeo }
