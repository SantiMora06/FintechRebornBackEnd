const mongoose = require('mongoose');
const { httpGetOne, httpGetAll, httpPut, httpDelete, httpPost } = require('../helpers/httpMethods');
const { roleMiddleware } = require('../middleware/role.middleware');
const { isAuthenticated } = require('../middleware/route-guard.middleware');
const Products = require('../models/Products.model');
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

router.get('/createdby/:userId', isAuthenticated, roleMiddleware(["customer", "admin"]), async (req, res, next) => {
    const { userId } = req.params;
    if (req.tokenPayload.role !== 'admin' && req.tokenPayload.userId !== userId) {
        return res.status(403).json({ error: 'Access denied. You can only access your own orders' })
    }
    try {
        const userProducts = await Products.find({ createdBy: new mongoose.Types.ObjectId(userId) })
        res.status(200).json(userProducts)
    } catch (error) {
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

router.post('/', isAuthenticated, roleMiddleware(["customer"]), (req, res, next) => {
    req.body.createdBy = req.user._id;
    httpPost(Products, req, res, next)
})

router.put('/:productId', isAuthenticated, roleMiddleware(["customer", "admin"]), async (req, res, next) => {
    const { productId } = req.params;
    const product = await Products.findById(productId);
    console.log(product)
    if (req.user.role !== "admin" && product.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Forbidden: You can only edit your own products' });
    }
    httpPut(Products, req, res, next, productId, "products")
})

router.delete('/:productId', isAuthenticated, roleMiddleware(["customer", "admin"]), async (req, res, next) => {
    const { productId } = req.params;
    const product = await Products.findById(productId);
    if (req.user.role !== "admin" && product.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Forbidden: You can only delete your own products' });
    }
    httpDelete(Products, res, next, productId, "products")
})

module.exports = router;