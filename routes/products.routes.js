const mongoose = require('mongoose');
const { httpGetOne, httpGetAll, httpPut, httpDelete, httpPost } = require('../helpers/httpMethods');
const { isAuthenticated } = require('../middleware/route-guard.middleware');
const Product = require('../models/Product.model')
const router = require("express").Router()

router.get('/', async(req, res, next) => {
    try {
        const productsData = await Product.find().populate('createdBy', 'username email');
        res.json(productsData);
      } catch (error) {
        next(error);
      }
    
    
    // httpGetAll(Product, res, next, "products")
})

router.get('/:productId', async(req, res, next) => {
    const { productId } = req.params;
    if (!mongoose.isValidObjectId(productId)) {
        return next(new Error('Invalid product ID'))
      }
      try {
        const product = await Product.findById(productId)
        if (!product) {
          throw new Error('Product not found!')
        }
        res.status(200).json(product)
      } catch (error) {
        next(error)
      }

    //httpGetOne(Product, res, next, productId, "products")
})

router.post('/', isAuthenticated, async (req, res, next) => {
    try {
      const newProduct = await Product.create({ ...req.body, createdBy: req.tokenPayload.userId })
      res.status(201).json(newProduct)
    } catch (error) {
      next(error)
    }
    // httpPost(Product, req, res, next)
})

/*router.put('/:productId', isAuthenticated, roleMiddleware(["customer", "admin"]), async(req, res, next) => {
    const { productId } = req.params; // ?? change
    /*const product = await Product.findById(productId);
    if (req.user.role !== "admin" && product.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Forbidden: You can only edit your own products' });
    } 
    httpPut(Products, req, res, next, productId, "products")
})*/
router.put('/:productId', isAuthenticated, async (req, res, next) => {
    const { productId } = req.params
  
    if (!mongoose.isValidObjectId(productId)) {
      return next(new Error('Invalid product ID'))
    }
  
    try {
      const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {
        new: true,
        runValidators: true,
      })
  
      if (!updatedProduct) {
        return next(new Error('Product not found'))
      }
      res.status(200).json(updatedProduct)
    } catch (error) {
      next(error)
    }
})



router.delete('/:productId', isAuthenticated, async(req, res, next) => {
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