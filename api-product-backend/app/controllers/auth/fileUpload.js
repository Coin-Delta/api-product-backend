const { uploadFile, getSignedUrl } = require('../../middleware/utils')
const { keccak256 } = require('js-sha3')

const fileUpload = async (req, res) => {
  try {
    let s3fileData = await uploadFile(
      req.body.base64path,
      req.body.imageName,
      true
    )
    const binaryData = Buffer.from(req.body.base64path, 'base64')
    const hash = '0x' + keccak256(binaryData)
    // const signedUrl = await getSignedUrl(req.body.imageName)
    res.status(201).json({
      url: s3fileData,
      // signedUrl,
      documentHash: hash
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Failed to upload file.' })
  }
}

const multiUploadFile = async (req, res) => {
  try {
    const files = req.body.files
    const uploadedFiles = []

    for (let fileData of files) {
      const s3fileData = await uploadFile(fileData.path, fileData.name, true)

      const binaryData = Buffer.from(fileData.path, 'base64')

      const hash = '0x' + keccak256(binaryData)
      // const signedUrl = await getSignedUrl(fileData.name)

      uploadedFiles.push({
        url: s3fileData,
        // signedUrl,
        documentHash: hash
      })
    }

    res.status(201).json(uploadedFiles)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Failed to upload files.' })
  }
}

module.exports = { fileUpload, multiUploadFile }
