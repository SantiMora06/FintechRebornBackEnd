const jwt = require("jsonwebtoken")

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]// Get the token from headers (Bearer 12121CDJDS)    
        const payload = jwt.verify(token, process.env.TOKEN_SECRET) // Decode the token and get payload
        req.tokenPayload = payload // pass the decoded payload to the next route
        next()
    } catch (error) {
        res.status(401).json("Token not provided or expired")
    }
}

module.exports = { isAuthenticated }