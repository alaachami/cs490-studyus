//IMPORT EXPRESS, ROUTER, AND SECURITY MIDDLEWARE
const express = require("express")
const router = express.Router()
const Chats = require("../models/chats")
const security = require("../middleware/security")

router.post("/send", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        //Retrieve the user information from the local server
        const { user } = res.locals
        // Retrieve group and sender ID from request body
        const { groupId } = req.body
        const { senderId } = req.body
        const { message } = req.body
        // Call the addNewMessage function to write the new message to database and save it in the chat variable
        const chat = await Chats.addNewMessage({ groupId, senderId, message, user })
        //Return the message if successful
        return res.status(200).json({ chat: chat })
    }
    catch (error) {
        next(error)
    }
})

router.post("/fetch", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        //Retrieve the user information from the local server
        const { user } = res.locals
        // Retrieve group and sender ID from request body
        const { groupId } = req.body
        // Call the addNewMessage function to write the new message to database and save it in the chat variable
        const chatList = await Chats.getAllMessages({ groupId, user })
        //Return the message if successful
        return res.status(200).json({ chatList: chatList })
    }
    catch (error) {
        next(error)
    }
})




//MODULE EXPORTS
module.exports = router