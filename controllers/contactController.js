const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")
// const { throws } = require("assert")


const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id })
    res.status(200).json(contacts)
    console.log(contacts)
})

const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    res.status(201).json(contact)
})
//@dsc Get a Contact
//@route GET/api/contact/:id
//@access Private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found")
    }
    res.status(200).json(contact)
})

//@dsc Update Contact
//@route PUT/api/contact/:id
//@access Private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found")
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error("User don't have permission to update other user contacts")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedContact)
})

//@dsc Delete Contact
//@route DELETE/api/contact/:id
//@access Private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found")
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error("User don't have permission to update other user contacts")
    }
    await Contact.findByIdAndDelete(req.params.id)

    res.status(200).json(contact)
})



module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
}