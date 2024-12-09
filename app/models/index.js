const fs = require('fs')
const modelsPath = `${__dirname}/`
const { removeExtensionFromFile } = require('../middleware/utils')

module.exports = () => {
  fs.readdirSync(modelsPath).filter((file) => {
    const modelFile = removeExtensionFromFile(file)
    return modelFile !== 'index' ? require(`./${modelFile}`) : ''
  })
}
