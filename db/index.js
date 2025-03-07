// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require('mongoose')

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://SantiMora:mL8wWM1UqB2PvM3O@phoenixtech.0rm2fou.mongodb.net/'
const withDB = async serverListener => {
  try {
    const x = await mongoose.connect(MONGO_URI)
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    if (typeof serverListener === 'function') {
      serverListener()
    }
  } catch (error) {
    console.error('Error connecting to mongo: ', error)
  }
}

module.exports = withDB
