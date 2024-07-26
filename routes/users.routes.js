const { httpGetOne, httpGetAll, httpPost, httpPut, httpDelete } = require('../helpers/httpMethods')
const User = require('../models/User.model')
const router = require('express').Router()
const { isAuthenticated } = require("../middleware/route-guard.middleware")
const { isAdmin } = require("../middleware/role-guard.middleware")


// Get all users: admin only
router.get('/', isAuthenticated, isAdmin, async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (error) {
        next(error);
      }
});

// Get a user 
router.get('/:userId', isAuthenticated, async (req, res, next) => {
    const { userId } = req.tokenPayload;
    if (!mongoose.isValidObjectId(userId)) {
        return next(new Error("invalid user Id"));
      }

    try {
    const userProfile = await User.findById(userId);
    if (!userProfile) {
        res.status(404).json({ message: "User profile doesn't exist" });
        return next(new Error("Profile not found"));
    }
    res.status(200).json(userProfile);
    } catch (error) {
    next(error);
    }


});


// Edit user profile
router.put('/:userId', isAuthenticated, async (req, res, next) => {
    const { userId } = req.tokenPayload;

    if (!mongoose.isValidObjectId(userId)) {
        return next(new Error('Invalid user Id'))
      }

    //delete req.body.passwordHash; //??
    try {
        const updatedProfile = await User.findByIdAndUpdate(userId, req.body, {
          new: true,
          runValidators: true,
        })
    
        if (!updatedProfile) {
          return next(new Error('Profile not found'))
        }
        res.status(200).json(updatedProfile)
      } catch (error) {
        next(error)
      }
})

// Delete a user by ID
router.delete('/:userId', isAuthenticated, (req, res, next) => {
    const { userId } = req.params
    if (req.user.role !== "admin" && req.user._id.toString() !== userId) {
        return res.status(403).json({ message: 'Forbidden' });
    }
});

module.exports = router;