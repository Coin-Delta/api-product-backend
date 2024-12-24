const APIService = require('../../services/apiService.js')
const BaseError = require('../../utils/error/baseError.js')
const ValidationError = require('../../utils/error/validationError.js')
const ResponseHelper = require('../../utils/responseHelper.js')

const validateDocument = async (req, res, next) => {
  console.log('validate doc')
  let documentType
  try {
    const { apiId, documentData } = req.body
    const apiDetails = await APIService.getAPIDetails(apiId)

    const validationSchema = apiDetails.inputSchema
    documentType = apiDetails.documentType
    console.log('apiDetails middleware:', apiDetails)
    console.log('documentData:', documentData)
    console.log('validationSchema:', validationSchema)
    const requiredProperties = new Set()
    for (const property of validationSchema.required) {
      requiredProperties.add(property)
    }
    Object.entries(documentData).forEach(([key, value]) => {
      // console.log(`Field: ${key}, Value: ${value}`)
      if (key in validationSchema.properties) {
        const prop = validationSchema.properties[key]

        // value type and db prop type should be same
        if (prop.type === 'Array') {
          if (Array.isArray(value)) {
            const isValidArray = value.every(
              (item) => typeof item === prop.individualType
            )
            if (!isValidArray) {
              throw new ValidationError(
                400,
                `${key}'s type should be only ${prop.type} of ${prop.individualType}.`
              )
            }
          } else {
            throw new ValidationError(400, `${key}'s type should be Array.`)
          }
        } else if (typeof value !== prop.type) {
          throw new ValidationError(
            400,
            `${key}'s type can't be ${typeof value}, it should be ${prop.type}.`
          )
        }

        // checking if this property is required it can't be null or empty
        if (requiredProperties.has(key)) {
          if (prop.type === 'Array') {
            // its length can't be 0 and
            if (!value.length) {
              throw new ValidationError(400, `${key} can't be empty or null`)
            }
            // any value in array can't be null or empty
            // let doesNotContainEmptyValue = true
            // for number and boolean any value is valid value even 0 ,false
            // if (!['number', 'boolean'].includes(prop.individualType)) {

            // string can't be empty or null
            if (prop.individualType === 'string') {
              const doesNotContainEmptyValue = value.every((item) => item)
              if (!doesNotContainEmptyValue) {
                throw new ValidationError(
                  400,
                  `${key} can't contain  empty or null values`
                )
              }
            }
          } else if (
            // !['number', 'boolean'].includes(prop.individualType) &&
            prop.type === 'string' &&
            !value
          ) {
            throw new ValidationError(400, `${key} can't be empty or null`)
          }
          requiredProperties.delete(key)
        }
      } else {
        // this key is in documentData but not in db
        // we allow no extra keys
        throw new ValidationError(
          400,
          'invalid input : sending some extra parameter in body'
        )
      }
    })

    console.log('req properties:', requiredProperties)
    // checking wheather all required properties are present in documentData
    // in above loop we remove req prop from set if we found that prop in documentData
    // if req prop set is not empty after loop => documentData missed some properties so need to throw err
    if (requiredProperties.size) {
      const missedPropertis = Array.from(requiredProperties).join(', ')
      throw new ValidationError(
        400,
        `missed required properties : ${missedPropertis}`
      )
    }

    req.apiDetails = apiDetails
    return next()
  } catch (error) {
    if (error instanceof BaseError) {
      console.log('error msg:', error.message)
      console.log('full err:', error)
      if (documentType) {
        return ResponseHelper.error(
          res,
          `${documentType} Verification failed`,
          error.statusCode,
          error
        )
      }
      return ResponseHelper.error(res, error.message, error.statusCode, error)
    }
    return ResponseHelper.serverError(res, error)
  }
}

module.exports = { validateDocument }
