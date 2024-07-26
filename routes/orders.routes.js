const { httpGetOne, httpGetAll, httpPut, httpDelete, httpPost } = require('../helpers/httpMethods');
const { isAdmin } = require('../middleware/role-guard.middleware');
const { isAuthenticated } = require('../middleware/route-guard.middleware');
const Order = require('../models/Order.models')
const router = require("express").Router()


router.get('/', isAuthenticated, isAdmin, async (req, res, next) => {
    try {
        const ordersData = await Order.find()
        .sort({createdAt: -1}
        )
            .populate({
                path: 'items.productId',
                model: 'Product',
            });


        res.json(ordersData);
    } catch (error) {
        next(error);
    }
})

router.get('/:orderId', isAuthenticated, (req, res, next) => {
    const { orderId } = req.params;
    httpGetOne(Order, res, next, orderId, "order")
})

// place a new order
router.post('/', isAuthenticated, async (req, res, next) => { 
    const {userId, orderItems, totalAmount} = req.body; totalAmount
    try {
      const totalPrice = orderItems.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);

      //const newOrder = await Order.create({ ...req.body, userId: req.tokenPayload.userId, totalAmount:totalPrice});
      res.status(201).json(newOrder);
    }
      catch (error) {
      next(error);
    }
  
});

router.put('/:orderId', isAuthenticated, (req, res, next) => {
    const { orderId } = req.params;
    httpPut(Order, req, res, next, orderId, "order")
})

router.delete('/:orderId', isAuthenticated, (req, res, next) => {
    const { orderId } = req.params; //ToDo: fetch from token
    httpDelete(Order, res, next, orderId, "order")
})

module.exports = router;