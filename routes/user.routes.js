const { httpGetOne, httpGetAll, httpPost, httpPut, httpDelete } = require('../helpers/httpMethods')
const User = require('../models/User.model')
const router = require('express').Router()
const { isAuthenticated } = require("../middleware/route-guard.middleware")
const { roleMiddleware } = require("../middleware/role.middleware")


router.get('/:userId', isAuthenticated, roleMiddleware(["customer", "admin"]), (req, res, next) => {
    const { userId } = req.params;
    httpGetOne(User, res, next, userId, "customer");
});

// Get all users
router.get('/', isAuthenticated, roleMiddleware(["admin"]), (req, res, next) => {
    httpGetAll(User, res, next, "customer");
});

// Create a new user
router.post('/', isAuthenticated, (req, res, next) => {
    httpPost(User, req, res, next);
});

// Update a user by ID
router.put('/:userId', isAuthenticated, roleMiddleware(["customer", "admin"]), (req, res, next) => {
    const { userId } = req.params;
    delete req.body.passwordHash; //??
    if (req.user.role !== "admin" && req.user._id.toString() !== userId) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    httpPut(User, req, res, next, userId, "customer");
})

// Delete a user by ID
router.delete('/:userId', isAuthenticated, roleMiddleware(["customer", "admin"]), (req, res, next) => {
    const { userId } = req.params
    if (req.user.role !== "admin" && req.user._id.toString() !== userId) {
        return res.status(403).json({ message: 'Forbidden' });
    }
});

module.exports = router;