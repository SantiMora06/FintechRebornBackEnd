const { httpGetOne, httpGetAll, httpPut, httpDelete, httpPost } = require('../helpers/httpMethods')
const Order = require('../models/Orders.models')
const router = require("express").Router()

router.get('/:orderId', /*Later on add the Auth*/(req, res, next) => {
    const { orderId } = req.params;
    httpGetOne(Order, res, next, orderId, "order")
})

router.get('/', /*Later on add the Auth*/(req, res, next) => {
    httpGetAll(Order, res, next, "order")
})

router.post('/', /*Later on add the Auth*/(req, res, next) => {
    httpPost(Order, req, res, next)
})

router.put('/:orderId', /*Later on add the Auth*/(req, res, next) => {
    const { orderId } = req.params;
    httpPut(Order, req, res, next, orderId, "order")
})

router.delete('/:orderId', /*Later on add the Auth*/(req, res, next) => {
    const { orderId } = req.params;
    httpDelete(Order, res, next, orderId, "order")
})

module.exports = router;