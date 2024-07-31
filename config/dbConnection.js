const mongoose = require("mongoose")
const connectDb = async () => {
    try {
        const connection = await mongoose.connect("mongodb://127.0.0.1:27017/mycontacts-backend")
        console.log("Database connected Succefully")
    } catch (e) {
        console.log(e)
    }
}

module.exports = connectDb