require('dotenv').config()
import helmet from "helmet";


const express = require('express')
const User = require('./models/Users.model')
const Order = require('./models/Orders.models')
const Products = require('./models/Products.model')
const OrderItem = require('./models/OrderItems.models')

const app = express()
app.use(helmet(""))

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app)

// 👇 Start handling routes here
const indexRoutes = require('./routes/index.routes')
app.use('/api', indexRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app)

module.exports = app
