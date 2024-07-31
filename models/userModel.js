
const mongoose = require("mongoose");

const userScema = mongoose.Schema({
    username: { type: String, required: [true, "Please add username"], unique: [true, " Username is already taken"] },
    email: { type: String, required: [true, "Please add user email address"], unique: [true, "email already in use"] },
    password: { type: String, required: [true, "Please add user password"] }
}, { timestamps: true })

module.exports = mongoose.model("User", userScema)