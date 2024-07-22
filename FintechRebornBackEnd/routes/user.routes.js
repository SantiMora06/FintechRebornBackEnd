const { httpGetOne, httpGetAll, httpPost, httpPut, httpDelete } = require('../helpers/httpMethods')
const User = require('../models/Users.model')
const router = require('express').Router()
router.get('/:userId', /* Later on add the Auth */(req, res, next) => {
    const { userId } = req.params;
    httpGetOne(User, res, next, userId, "user");
});

// Get all users
router.get('/', /* Later on add the Auth */(req, res, next) => {
    httpGetAll(User, res, next, "user");
});

// Create a new user
router.post('/', /* Later on add the Auth */(req, res, next) => {
    httpPost(User, req, res, next);
});

// Update a user by ID
router.put('/:userId', /* Later on add the Auth */(req, res, next) => {
    const { userId } = req.params;
    httpPut(User, req, res, next, userId, "user");
})

// Delete a user by ID
router.delete('/:userId', /* Later on add the Auth */(req, res, next) => {
    const { userId } = req.params;
    httpDelete(User, res, next, userId, "user");
});

module.exports = router;