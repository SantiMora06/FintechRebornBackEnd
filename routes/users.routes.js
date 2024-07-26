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
router.get('/current', isAuthenticated, async (req, res, next) => {
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

router.get('/:userId',isAuthenticated, isAdmin, async (req, res, next) => {
  const { userId } = req.params;
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
router.put('/', isAuthenticated, async (req, res, next) => {
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

// Delete a user by ID (admin and customer by ID) 
router.delete('/:userId', isAuthenticated, async (req, res, next) => {
  const { userId } = req.tokenPayload;
  if (!mongoose.isValidObjectId(userId)) {
    return next(new Error('Invalid user Id'))
  }

  try {
    const userToDelete = await User.findById(userId)
    if (!userToDelete) {
      return next(new Error('User with ID not found'))
    }
    if (req.tokenPayload.role !== "admin" || userToDelete.createdBy !== userId) {
      return res.status(403).json({ message: 'Forbidden to delete this user' });
    } 
    else {
    await User.findByIdAndDelete(userId)
    res.status(204).send()
    }
  } 
  catch (error) {
    next(error)
  }
});

// Delete all users (admin only) 

module.exports = router;