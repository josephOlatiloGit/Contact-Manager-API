const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const bodyParser = require('body-parser')
const User = require("../models/userModel")
const dotenv = require("dotenv").config()
const { constants } = require("../constants")
const { validateEmail, validatePassword } = require('../passwordutil')

// console.log(process.env)

// console.log(jwt)

//@dsc Register a user
//@route POST/api/users/register
//@access Public

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    console.log(req.body)
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("Missing required filed to register")

    }

    const validPassword = validatePassword(password);
    if (!validPassword.valid) {
        return res.status(400).send({ "msg": validPassword.msg });
    }

    const validEmail = validateEmail(email);
    if (!validEmail) {
        return res.status(400).send({ "msg": "Invalid Email" });
    }

    const userAvailable = await User.findOne({ email, username })
    if (userAvailable) {
        res.status(400)
        throw new Error("User already registered")
    }
    //Hashed Password with sortround number of 10
    const hashedpassword = await bcrypt.hash(password, 10)
    console.log("hashed password is:", hashedpassword)
    const user = await User.create({
        username,
        email,
        password: hashedpassword
    })
    console.log(`User created ${user}`)
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email })
    } else {
        res.status(400)
        throw new Error("Registration failed! User data not vailid")
    }
    res.send({ message: "Register user" })
})

//@dsc Login user
//@route POST/api/users/Login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error("All fileds are Mandatory")
    }
    const user = await User.findOne({ email })
    //Compare user password with hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        console.log("user compared", user)
        //create the signin payload

        try {
            const accessToken = jwt.sign(
                {
                    user: {
                        username: user.username,
                        email: user.email,
                        id: user.id
                    },
                }, process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "10m" }
            )
            // user.accessToken = accessToken
            console.log("accessToken", accessToken)
            // res.status(200).json({ accessToken })
            res.redirect('/main')

        } catch (e) {
            console.log(e)
            res.status(500)
        }
    } else {
        res.status(401)
        throw new Error("Email or Password Not valid")
    }

})



//@dsc Login user
//@route POST/api/users/Login
//@access Private
const currentUser = asyncHandler(async (req, res) => {

    res.json(req.user)
})

module.exports = { registerUser, loginUser, currentUser }