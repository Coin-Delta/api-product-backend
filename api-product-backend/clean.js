require('dotenv-safe').config()
const initMongo = require('./config/mongo')
const fs = require('fs')
const modelsPath = `./app/models`
const { removeExtensionFromFile } = require('./app/middleware/utils')

if (!process?.env?.npm_config_dburl) {
  console.log('Please provide the DB URL as an argument.')
  process.exit(0)
}

if (process?.env?.npm_config_dburl === 'test') {
  process.env['npm_config_dburl'] = process.env.MONGO_URI_TEST
}

initMongo(process?.env?.npm_config_dburl)

// Loop models path and loads every file as a model except index file
const models = fs.readdirSync(modelsPath).filter((file) => {
  return (
    removeExtensionFromFile(file) !== 'index' &&
    removeExtensionFromFile(file) !== 'fnftAbi' &&
    removeExtensionFromFile(file) !== 'nftAbi'
  )
})

const deleteModelFromDB = (model) => {
  return new Promise((resolve, reject) => {
    model = require(`./app/models/${model}`)
    model.deleteMany({}, (err, row) => {
      if (err) {
        reject(err)
      } else {
        resolve(row)
      }
    })
  })
}

const clean = async () => {
  try {
    const promiseArray = models.map(
      async (model) => await deleteModelFromDB(model)
    )
    await Promise.all(promiseArray)
    console.log('Cleanup complete!')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(0)
  }
}

clean()
