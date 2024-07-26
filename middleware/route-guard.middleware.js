const jwt = require("jsonwebtoken")
const secret = require("../config/secretGenerator")

const isAuthenticated = async (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1]// Get the token from headers (Bearer 12121CDJDS)    

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    const payload = jwt.verify(token, secret) 
    req.tokenPayload = payload // to pass the decoded payload to the next route
    next() 
    }

    catch (error) {
        // the middleware will catch error and send 401 if:
        // 1. There is no token
        // 2. Token is invalid
        // 3. There is no headers or authorization in req (no token)
        res.status(401).json('Token not provided or not valid')
    }
}

module.exports = { isAuthenticated }