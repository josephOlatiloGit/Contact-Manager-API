const express = require("express")
const connectDb = require("./config/dbConnection")
const errorHandler = require("./middleware/errorHandler")
const dotenv = require("dotenv").config()
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser')
const cors = require('cors')



connectDb()

const app = express()
const port = process.env.PORT || 5000


// app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())
app.use(cookieParser())


app.use("/contacts", require("./routes/contactRoutes"))
app.use("/users", require("./routes/userRoutes"))
app.use(errorHandler)

// Static Files
app.use(express.static("public"))

//Template Engine

// app.set('layout', './layouts/main')
app.set('view engine', 'ejs')


app.get("/login", (req, res) => {
    res.render(__dirname + '/views/login.ejs')
})
app.get("/signup", (req, res) => {
    res.render('signup')
})


app.listen(port, () => {
    console.log(`Server running on ${port}`)
}) 

// console