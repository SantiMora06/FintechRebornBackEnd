const { httpGetOne, httpGetAll, httpPut, httpDelete, httpPost } = require('../helpers/httpMethods');
const { roleMiddleware } = require('../middleware/role.middleware');
const { isAuthenticated } = require('../middleware/route-guard.middleware');
const Product = require('../models/Product.model')
const User = require('../models/User.model');
const router = require("express").Router()

router.get('/category/:category', async (req, res, next) => {
    const { category } = req.params;
    try {
        const data = await Product.find({ category })

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
    httpGetOne(Product, res, next, productId, "products")
})



router.get('/', /*Later on add the Auth*/(req, res, next) => {
    httpGetAll(Product, res, next, "products")
})

router.post('/', isAuthenticated, roleMiddleware(["customer", "admin"]), (req, res, next) => {
    req.body.createdBy = req.user._id; //incomplete ??
    httpPost(Product, req, res, next)
})

router.put('/:productId', isAuthenticated, roleMiddleware(["customer", "admin"]), async(req, res, next) => {
    const { productId } = req.params; // ?? change
    /*const product = await Product.findById(productId);
    if (req.user.role !== "admin" && product.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Forbidden: You can only edit your own products' });
    } */
    httpPut(Products, req, res, next, productId, "products")
})

router.delete('/:productId', isAuthenticated, roleMiddleware(["customer", "admin"]), async(req, res, next) => {
    const { productId } = req.params;
    if (!mongoose.isValidObjectId(productId)) {
        return next(new Error('Invalid product ID'))
      }

    try {
    const productToDelete = await Product.findById(productId)
    if (!productToDelete) {
        return next(new Error(`Product with ${productId} not found`))
    }
    if (productToDelete.createdBy === req.tokenPayload.userId) {
        await Product.findByIdAndDelete(productId)
        res.status(204).send()
    }
    } catch (error) {
    next(error)
    }
})

module.exports = router;