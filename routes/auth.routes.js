const User = require("../models/User.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { isAuthenticated } = require("../middleware/route-guard.middleware")
require("dotenv").config()
const router = require("express").Router()
const secret = require("../config/secretGenerator")
const { isAdmin } = require("../middleware/role-guard.middleware")

//All routes starts with /auth

router.get("/", (req, res) => {
    res.json("All good in auth")
})

// POST Signup
router.post("/signup", async (req, res, next) => {
    const salt = bcrypt.genSaltSync(12)
    const passwordHash = bcrypt.hashSync(req.body.password, salt)

    try {
        const newUser = await User.create({ ...req.body, passwordHash })
        res.status(201).json(newUser)
    } catch (error) {
        if (error.code === 11000) {
            res.status(409).json({ message: "Username already exists!" });
        }
        next(error)
    }
})

//POST login

router.post("/login", async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const potentialUser = await User.findOne({ username })
        // If user exists with this username
        if (potentialUser) {
            // if user has the correct credentials
            if (bcrypt.compareSync(password, potentialUser.passwordHash)) {
                const payload = {
                    userId: potentialUser._id,
                    username: potentialUser.username,
                    role: potentialUser.role,
                  };

                const token = jwt.sign(payload, secret, {
                    algorithm: "HS256",
                    expiresIn: "1h",
                })
                res.status(200).json({ token });
            } else {
                res.status(406).json({ message: "Username or password incorrect" })
            }
        } 

    } catch (error) {
        next(error)
    }
})

// GET verified: customer
router.get("/verify", isAuthenticated, (req, res, next) => {
    res.status(200).json(req.tokenPayload);
})

// GET verified: admin
router.get("/verify/admin",isAuthenticated, isAdmin, (req, res, next) => {
    res.status(200).json(req.tokenPayload);
  }
);

module.exports = router

