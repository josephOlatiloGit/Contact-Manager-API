const mongoose = require("mongoose")

const contactShema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, role: "User", },
    name: { type: String, required: [true, "Please add the contact name"] },
    email: { type: String, required: [true, "Please add the contact emial address"] },
    phone: { type: String, required: [true, "Please add the contact phone number"] },
}, { timestamps: true })

module.exports = mongoose.model("Contact", contactShema)