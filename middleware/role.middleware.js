const User = require("../models/Users.model")

const roleMiddleware = (roles) => {

    return async (req, res, next) => {
        if (req.user) {
            if (roles.includes(req.user.role)) {
                return next();
            }
            return res.status(403).json({ message: `Forbidden user role: ${req.user.role}` });
        }
        return res.status(401).json({ message: 'Unauthorized: No user authenticated' });

    };
};

module.exports = { roleMiddleware }