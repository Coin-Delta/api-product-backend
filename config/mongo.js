const mongoose = require('mongoose')

const loadModels = require('../app/models')

module.exports = (DBURL) => {
  const connect = () => {
    const DB_URL =
      process.env.NODE_ENV === 'test'
        ? process.env.MONGO_URI_TEST
        : process.env.MONGO_URI
    // mongoose.Promise = global.Promise
    // if (process.env.NODE_ENV === 'development') {
    //   mongoose.set('debug', (collectionName, method) => {
    //     console.log({
    //       type: 'mongodb_log',
    //       date: new Date(),
    //       connection: mongoose.connection.base.connections.length,
    //       collectionName,
    //       method
    //     })
    //   })
    // }

    mongoose.connect(
      DBURL ? DBURL : DB_URL,
      {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 250,
        connectTimeoutMS: 30000,
        socketTimeoutMS: 30000
      },
      (err) => {
        let dbStatus = ''
        if (err) {
          dbStatus = `*    Error connecting to DB: ${err}\n****************************\n`
        }
        dbStatus = `*    DB Connection: OK\n****************************\n`
        if (process.env.NODE_ENV !== 'test') {
          // Prints initialization
          console.log('****************************')
          console.log('*    Starting Server')
          console.log(`*    Port: ${process.env.PORT || 3000}`)
          console.log(`*    NODE_ENV: ${process.env.NODE_ENV}`)
          console.log(`*    Database: MongoDB`)
          console.log(dbStatus)
        }
      }
    )
    // mongoose.set('useCreateIndex', true)
    // mongoose.set('useFindAndModify', false)
  }
  connect()

  mongoose.connection.on('error', console.log)
  mongoose.connection.on('disconnected', connect)

  loadModels()
}
