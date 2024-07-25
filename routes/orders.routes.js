const { httpGetOne, httpGetAll, httpPut, httpDelete, httpPost } = require('../helpers/httpMethods');
const { roleMiddleware } = require('../middleware/role.middleware');
const { isAuthenticated } = require('../middleware/route-guard.middleware');
const Order = require('../models/Orders.models')
const router = require("express").Router()

router.get('/:orderId', isAuthenticated, roleMiddleware(["user", "admin"]), (req, res, next) => {
    const { orderId } = req.params;
    httpGetOne(Order, res, next, orderId, "order")
})

router.get('/', isAuthenticated, roleMiddleware(["admin"]), (req, res, next) => {
    httpGetAll(Order, res, next, "order")
})

router.post('/', isAuthenticated, roleMiddleware(["user"]), (req, res, next) => { // Once you buy, you post an order
    httpPost(Order, req, res, next)
})

router.put('/:orderId', isAuthenticated, roleMiddleware(["user"]), (req, res, next) => {
    const { orderId } = req.params;
    httpPut(Order, req, res, next, orderId, "order")
})

router.delete('/:orderId', isAuthenticated, roleMiddleware(["user"]), (req, res, next) => {
    const { orderId } = req.params;
    httpDelete(Order, res, next, orderId, "order")
})

module.exports = router;