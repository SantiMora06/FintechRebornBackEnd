require('dotenv').config()
const express = require('express')



// Initialize Express APP- https://expressjs.com/en/4x/api.html#express
const app = express()
const indexRoutes = require("./routes/index.routes")
const authRoutes = require("./routes/auth.routes")

// routes
app.use('/api', indexRoutes)
app.use("/auth", authRoutes)

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app)


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./middleware/error-handling')(app)

module.exports = app


