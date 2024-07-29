const { httpGetOne, httpGetAll, httpPut, httpDelete, httpPost } = require('../helpers/httpMethods');
const { roleMiddleware } = require('../middleware/role.middleware');
const { isAuthenticated } = require('../middleware/route-guard.middleware');
const Order = require('../models/Orders.models')
const router = require("express").Router()
const mongoose = require("mongoose")

router.get('/:orderId', isAuthenticated, roleMiddleware(["customer", "admin"]), (req, res, next) => {
    const { orderId } = req.params;
    httpGetOne(Order, res, next, orderId, "order")
})

router.get('/', isAuthenticated, roleMiddleware(["admin"]), (req, res, next) => {
    httpGetAll(Order, res, next, "order")
})

router.get('/currentuser/:userId', isAuthenticated, roleMiddleware(["customer", "admin"]), async (req, res, next) => {
    const { userId } = req.params;
    if (req.tokenPayload.role !== 'admin' && req.tokenPayload.userId !== userId) {
        return res.status(403).json({ error: 'Access denied. You can only access your own orders' })
    }
    try {
        const ordersOfUser = await Order.find({ userId: new mongoose.Types.ObjectId(userId) })
        res.status(200).json(ordersOfUser)
    } catch (error) {
        next(error)
    }
})

router.post('/', isAuthenticated, roleMiddleware(["customer"]), (req, res, next) => { // Once you buy, you post an order
    httpPost(Order, req, res, next)
})

router.put('/:orderId', isAuthenticated, roleMiddleware(["customer"]), (req, res, next) => {
    const { orderId } = req.params;
    httpPut(Order, req, res, next, orderId, "order")
})

router.delete('/:orderId', isAuthenticated, roleMiddleware(["customer"]), (req, res, next) => {
    const { orderId } = req.params;
    httpDelete(Order, res, next, orderId, "order")
})



module.exports = router;