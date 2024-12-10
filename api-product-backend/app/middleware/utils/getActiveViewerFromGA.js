const { google } = require('googleapis')
const analytics = google.analyticsdata('v1beta')
const scopes = ['https://www.googleapis.com/auth/analytics.readonly']

const getActiveViewerFromGA = async (productId) => {
  return new Promise(async (resolve) => {
    let activeViewers = 0
    const request = {
      property: `properties/${process.env.GOOGLE_PROPERTYID}`,
      minuteRanges: [
        {
          startMinutesAgo: +process.env.GOOGLE_MINUTE_RANGE
        }
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'eventName',
          stringFilter: {
            matchType: 'CONTAINS',
            caseSensitive: false,
            value: productId
          }
        }
      },
      dimensions: [
        {
          name: 'eventName'
        }
      ],
      metrics: [
        {
          name: 'eventCount'
        }
      ]
    }
    try {
      const jwt = new google.auth.JWT(
        process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        null,
        process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATEKEY.replace(/\\n/g, '\n'),
        scopes
      )

      await jwt.authorize(async (err) => {
        if (err) {
          console.log(err)
          return
        }
      })

      const result = await analytics.properties.runRealtimeReport({
        property: `properties/${process.env.GOOGLE_PROPERTYID}`,
        auth: jwt,
        requestBody: request
      })
      const rows = result?.data?.rows
      if (rows?.length) {
        activeViewers = rows[0]?.metricValues[0]?.value || 0
      }
    } catch (e) {
      console.log(e)
    }
    resolve(activeViewers)
  })
}

module.exports = { getActiveViewerFromGA }
