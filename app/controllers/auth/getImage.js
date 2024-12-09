const { getSignedUrl } = require('../../middleware/utils/uploadToS3')
const request = require('request')

const getImage = async (req, res) => {
  try {
    const fileName = req.params.fileName

    const signedUrl = await getSignedUrl(fileName)

    res.status(200).json(signedUrl)

    // Fetch the file from S3 using the signed URL and pipe it to the response
    // request(signedUrl)
    //   .on('response', (response) => {
    //     res.set('Content-Type', response.headers['content-type']);
    //   })
    //   .on('error', (err) => {
    //     res.status(500).json({ error: 'Failed to retrieve file.' });
    //   })
    //   .pipe(res);
  } catch (err) {
    console.log('ERROR>>>>>', err)
    res.status(500).json({ error: 'Failed to retrieve file.' })
  }
}

module.exports = { getImage }
