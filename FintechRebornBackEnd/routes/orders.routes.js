const { httpGetOne, httpGetAll, httpPut, httpDelete, httpPost } = require('../helpers/httpMethods')
const Orders = require('../models/Orders.model')
const router = require("express").Router()

router.get('/:orderId', /*Later on add the Auth*/(req, res, next) => {
    const { orderId } = req.params;
    httpGetOne(Orders, res, next, ordertId, "order")
})

router.get('/', /*Later on add the Auth*/(req, res, next) => {
    httpGetAll(Orders, res, next, "order")
})

router.post('/', /*Later on add the Auth*/(req, res, next) => {
    httpPost(Orders, req, res, next)
})

router.put('/:orderId', /*Later on add the Auth*/(req, res, next) => {
    const { orderId } = req.params;
    httpPut(Orders, req, res, next, orderId, "order")
})

router.delete('/:orderId', /*Later on add the Auth*/(req, res, next) => {
    const { orderId } = req.params;
    httpDelete(Orders, res, next, orderId, "order")
})

module.exports = router;