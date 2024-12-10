const request = require('request')
const { v4: uuidv4 } = require('uuid')
const AWS = require('aws-sdk')
const pdfParse = require('pdf-parse')
const mime = require('mime-types')

const s3 = new AWS.S3({
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key,
  signatureVersion: 'v4',
  region: 'ap-south-1'
})

const uploadToS3 = async (
  fileData,
  fileName,
  isBase64 = false,
  directory = ''
) => {
  try {
    let buffer
    let contentType // Variable to store the detected content type

    if (isBase64) {
      buffer = Buffer.from(
        fileData.replace(/^data:image\/\w+;base64,/, ''),
        'base64'
      )
      // Detect the content type from the base64 data
      contentType = mime.contentType(fileName) || 'application/octet-stream'
    } else {
      const response = await fetch(fileData)

      buffer = await response.buffer()
      contentType =
        response.headers.get('content-type') || 'application/octet-stream'
    }

    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: directory ? `${directory}/${fileName}` : fileName,
      Body: buffer,
      // ACL: 'public-read',
      ContentType: contentType, // Set the content type based on detection
      ACL: 'private'
    }

    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          return reject(err)
        } else {
          resolve(data && data.Location)
        }
      })
    })
  } catch (ex) {
    return Promise.reject(ex)
  }
}

const validatePdfContent = async (buffer) => {
  try {
    const data = await pdfParse(buffer)

    const disallowedPdfStructure =
      /^[\s\S]*%PDF-1\.3[\s\S]*?<<\/JS[\s\S]*?app\.alert[\s\S]*?\/S\s*\/JavaScript[\s\S]*%%EOF$/

    if (disallowedPdfStructure.test(data.text)) {
      throw new Error('PDF contains potentially malicious JavaScript content')
    }

    // Additional security checks
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /\/JS\s/i,
      /\/JavaScript/i,
      /\/S\s*\/JavaScript/i,
      /\beval\s*\(/i,
      /document\.write/i,
      /app\.alert/i
    ]

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(data.text)) {
        throw new Error(`Suspicious content detected: ${pattern.toString()}`)
      }
    }

    return true // PDF is valid
  } catch (error) {
    console.error('Error validating PDF:', error)
    throw error
  }
}

const uploadFile = async (
  fileData,
  fileName,
  isBase64 = false,
  directory = ''
) => {
  // Generate a unique identifier for the file name
  const uniqueIdentifier = uuidv4()
  const fileExtension = fileName.split('.').pop()
  const randomFileName = `${uniqueIdentifier}.${fileExtension}`

  try {
    let buffer
    let contentType

    if (isBase64) {
      // Adjust regex pattern to handle both images and PDFs
      const base64Pattern = /^data:(image\/\w+|application\/pdf);base64,/
      const matches = fileData.match(base64Pattern)
      if (!matches) {
        throw new Error('Invalid base64 data')
      }

      const detectedMimeType = matches[1]
      buffer = Buffer.from(fileData.replace(base64Pattern, ''), 'base64')
      contentType = detectedMimeType
    } else {
      const response = await fetch(fileData)

      buffer = await response.buffer()
      contentType =
        response.headers.get('content-type') || 'application/octet-stream'
    }

    // Validate PDF if the content type is application/pdf
    if (contentType === 'application/pdf') {
      try {
        await validatePdfContent(buffer)
      } catch (error) {
        throw new Error(`PDF validation failed: ${error.message}`)
      }
    }

    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: directory ? `${directory}/${randomFileName}` : randomFileName,
      Body: buffer,
      ContentType: contentType,
      ACL: 'private'
    }

    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          return reject(err)
        } else {
          resolve(data && data.Location)
        }
      })
    })
  } catch (ex) {
    return Promise.reject(ex)
  }
}

const deleteFromS3 = async (fileName) => {
  const deleteParams = {
    Bucket: process.env.S3_BUCKET,
    Key: fileName
  }
  return new Promise((resolve, reject) => {
    s3.deleteObject(deleteParams, (err, data) => {
      if (err) {
        console.error('Error deleting object:', err)
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
// const expirationTime = parseInt(process.env.EXPIRATION_TIME,10)
const getSignedUrl = async (fileName) => {
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: fileName,
    Expires: 120
  }

  return new Promise((resolve, reject) => {
    s3.getSignedUrl('getObject', params, (err, url) => {
      if (err) {
        console.error('Error generating signed URL:', err)
        reject(err)
      } else {
        resolve(url)
      }
    })
  })
}

module.exports = {
  uploadToS3,
  uploadFile,
  deleteFromS3,
  getSignedUrl
}
