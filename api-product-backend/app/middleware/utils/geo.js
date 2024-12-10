/**
 * This is an map of blocked country codes to a list of regions
 *
 * if region is empty it means every region will be blocked
 *
 * country: ISO 3166-1 alpha-2 code
 * region: FIPS 10-4 for US/Canada and ISO 3166-2 in other countries
 */
let BLOCKED_COUNTRIES_TO_REGIONS = {}

try {
  BLOCKED_COUNTRIES_TO_REGIONS = JSON.parse(
    process.env.BLOCKED_COUNTRIES_TO_REGIONS
  )
} catch (e) {
  console.error(e)
  if (process.env.NODE_ENV === 'development') {
    throw new Error(
      'Must set BLOCKED_COUNTRIES_TO_REGIONS as an env var and ensure that it is a valid JSON.'
    )
  }
}

const isUnsupportedGeo = ({ country, region }) => {
  const blockedRegions = BLOCKED_COUNTRIES_TO_REGIONS[country]

  return (
    blockedRegions &&
    (blockedRegions.length === 0 || blockedRegions.includes(region))
  )
}

module.exports = { isUnsupportedGeo }
