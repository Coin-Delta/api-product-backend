const { deleteFromS3 } = require('../../middleware/utils')

const deleteFile = async (req, res) => {
  try {
    let s3fileData = await deleteFromS3(req.body.fileName)
    res.status(201).json({ data: "Successfully deleted file from bucket" })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Failed to Delete file.' })
  }
}

module.exports = { deleteFile }
