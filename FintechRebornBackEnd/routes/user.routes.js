const { httpGetOne, httpGetAll } = require('../helpers/httpMethods')
const User = require('../models/Users.model')
const router = require('express').Router()

router.get('/users/:userId', /*later on auth */(req, res, next) => {
    const { userId } = req.params;
    httpGetOne(User, res, next, userId, "user")
})

router.get('/', /*Later on add the Auth*/(req, res, next) => {
    httpGetAll(User, res, next, "user")
})

module.exports = router