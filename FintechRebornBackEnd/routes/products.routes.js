const { httpGetOne, httpGetAll, httpPut, httpDelete, httpPost } = require('../helpers/httpMethods')
const Products = require('../models/Products.model')
const router = require("express").Router()

router.get('/:productId', /*Later on add the Auth*/(req, res, next) => {
    const { productId } = req.params;
    httpGetOne(Products, res, next, productId, "products")
})

router.get('/', /*Later on add the Auth*/(req, res, next) => {
    httpGetAll(Products, res, next, "products")
})

router.post('/', /*Later on add the Auth*/(req, res, next) => {
    httpPost(Products, req, res, next)
})

router.put('/:productId', /*Later on add the Auth*/(req, res, next) => {
    const { productId } = req.params;
    httpPut(Products, req, res, next, productId, "products")
})

router.delete('/:productId', /*Later on add the Auth*/(req, res, next) => {
    const { productId } = req.params;
    httpDelete(Products, res, next, productId, "products")
})

module.exports = router;