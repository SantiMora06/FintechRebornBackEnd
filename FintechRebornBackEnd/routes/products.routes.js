const { httpGetOne, httpGetAll, httpPut, httpDelete, httpPost } = require('../helpers/httpMethods');
const { roleMiddleware } = require('../middleware/role.middleware');
const { isAuthenticated } = require('../middleware/route-guard.middleware');
const Products = require('../models/Products.model')
const router = require("express").Router()

router.get('/category/:category', async (req, res, next) => {
    const { category } = req.params;
    try {
        const data = await Products.find({ category })

        if (!data) {
            return next(new Error(`${category} not found`))
        }

        res.status(200).json(data)
    }
    catch (error) {
        next(error)
    }
})

router.get('/:productId', /*Later on add the Auth*/(req, res, next) => {
    const { productId } = req.params;
    httpGetOne(Products, res, next, productId, "products")
})



router.get('/', /*Later on add the Auth*/(req, res, next) => {
    httpGetAll(Products, res, next, "products")
})

router.post('/', isAuthenticated, roleMiddleware(["user", "admin"]), (req, res, next) => {
    httpPost(Products, req, res, next)
})

router.put('/:productId', isAuthenticated, roleMiddleware(["user", "admin"]), (req, res, next) => {
    const { productId } = req.params;
    httpPut(Products, req, res, next, productId, "products")
})

router.delete('/:productId', isAuthenticated, roleMiddleware(["user", "admin"]), (req, res, next) => {
    const { productId } = req.params;
    httpDelete(Products, res, next, productId, "products")
})

module.exports = router;