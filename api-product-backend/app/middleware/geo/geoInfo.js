const geoip = require('fast-geoip')
const { getIP, getCountry } = require('../utils')

const geoInfo = async (req, res, next) => {
  let ip = getIP(req)

  if (ip.includes('::ffff:')) {
    ip = ip.split(':').reverse()[0]
  }

  const _geoInfo = await geoip.lookup(ip)
  const cfCountry = getCountry(req)

  req.geoInfo = {
    ..._geoInfo,
    // use CF country if present
    ...(cfCountry !== 'XX' ? { country: cfCountry } : undefined)
  }

  next()
}

module.exports = { geoInfo }
