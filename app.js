require('dotenv').config()
const express = require('express')
const logger = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")


// Initialize Express APP
const app = express()
const indexRoutes = require("./routes/index.routes")
const authRoutes = require("./routes/auth.routes")


//Middleware
app.use(
    cors({
        origin: ["http://localhost:5173"]
    })
);
app.use(express.json())
app.use(logger("dev"))
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(helmet())
app.disable("x-powered-by")

// routes
require('./config')(app)

app.use("/api", indexRoutes)
app.use("/auth", authRoutes)

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware



// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app)

module.exports = app
