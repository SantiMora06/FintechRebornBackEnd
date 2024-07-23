const router = require('express').Router()

router.get('/', (req, res) => {
  res.json('All good in here')
})

const usersRoutes = require("./user.routes")
router.use("/users", usersRoutes)

const ordersRoutes = require("./orders.routes")
router.use("/orders", ordersRoutes)

const productRoutes = require("./products.routes")
router.use("/products", productRoutes)

module.exports = router
