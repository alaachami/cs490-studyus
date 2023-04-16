//IMPORTING THE DATABASE, BCRYPT TO HASH PASSWORDS, AND ERROR HANDLING CLASSES
const db = require("../db")
const bcrypt = require('bcrypt')
const {BCRYPT_WORK_FACTOR} = require('../config')
const {UnauthorizedError, BadRequestError} = require("../utils/errors")
const Groups = require("./groups")

class Chats {

    // FUNCTION TO GET ALL CHAT MESSAGES
    static async getAllMessages({groupId, user}) {
        //If a new member was not provided, throw a bad request error detailing that the user needs to provide a member email
        if(!groupId) {
            throw new BadRequestError(`Group id is missing!`)
        }
        // Post the chat message, with group and sender id
        const results = await db.query(
            `
            SELECT *
            FROM chat_messages
            WHERE (group_id = $1)
        `, [groupId])

        return results.rows
    }

    //FUNCTION TO ADD A NEW group MEMBER TO AN EXISTING group. Uses their email as a parameter
    static async addNewMessage({groupId, senderId, message, user})
    {
        //If a new member was not provided, throw a bad request error detailing that the user needs to provide a member email
        if(!groupId) {
            throw new BadRequestError(`Group id is missing!`)
        }
        else if (!senderId) {
            throw new BadRequestError('Sender id is missing!')
        }
        console.log("Checkpoint 1")
        if (!await Groups.checkExistingMember(senderId, groupId)) {
            throw new UnauthorizedError('Unauthorized: Sender is not in the group!')
        }
        console.log("Checkpoint 2")
        console.log("Message: " + message)
        // Post the chat message, with group and sender id
        const results = await db.query(
            `
            INSERT INTO chat_messages
            (
                group_id,
                sender_id,
                message
            )
            VALUES($1, $2, $3)
            RETURNING group_id, sender_id, message
        `, [groupId, senderId, message])

        //Store the results of the new group information
        //If user is not authorized to change the group information or the groupId is not found or the array can not be updated
        //Then throw a not found error detailing that the request could not be executed
        const chat = results.rows[0]
        if(!chat)
        {
            throw new NotFoundError("Message was not found! Could not create message!")
        }

        //Return the chat information
        return chat
    }



}
module.exports = Chats