const User = require("../models/Users.model")

const roleMiddleware = (roles) => {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized: No user authenticated' });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: `Forbiden user role: ${req.user.role}` });
        }
        next();
    };
};

module.exports = { roleMiddleware }