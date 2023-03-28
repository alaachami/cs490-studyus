//IMPORTING THE DATABASE, BCRYPT TO HASH PASSWORDS, AND ERROR HANDLING CLASSES
const db = require("../db")
const bcrypt = require('bcrypt')
const {BCRYPT_WORK_FACTOR} = require('../config')
const {UnauthorizedError, BadRequestError} = require("../utils/errors")

class User {

    //FUNCTION TO SEND ONLY GENERAL INFORMATION ABOUT USER
    //RATHER THAN INCLUDING PERTINENT INFORMATION SUCH AS PASSWORD
    static makePublicUser(user)
    {
        //Return all user information except the password
        return {
            id: user.id,
            email: user.email,
            name: user.name
        }
    }




    //FUNCTION TO LOGIN A USER AFTER AUTHENTICATING CORRECT EMAIL AND PASSWORD
    static async login(credentials)
    {
        //Make sure that request body includes all necessary information : email and password
        //If parts of the body information is missing, then send back a bad request error with information of the missing fields
        const requiredFields = ["email", "password"]
        requiredFields.forEach((field) => {
            if(!credentials.hasOwnProperty(field))
            {
                throw new BadRequestError(`Missing ${field} in request`)
            }
        })

        //Authenticate the user and make sure that the user actually exist by making a query to the database using the provided email
        //If the user exists, check to see if the given password matches the hashed password in the database.
        //If so, return that user information
        const existingUser = await User.fetchUserByEmail(credentials.email)
        if(existingUser)
        {
            const isValid = await bcrypt.compare(credentials.password, existingUser.password)
            if(isValid)
            {
                return User.makePublicUser(existingUser)
            }
        }

        //If user is not found or wrong password/email is given, send back an unauthorization error
        throw new UnauthorizedError("Invalid email and password combo")
    }





    //FUNCTION TO REGISTER A USER INTO THE DATABASE GIVEN THE EMAIL, PASSWORD, AND NAME
    static async register(credentials)
    {
        //Make sure that the request body all pertinent information including email, password, and the user's full name
        //If one of these fields does not exist within the request body, throw a bad request detailing the missing field
        const requiredFields = ["email", "name", "password"]
        requiredFields.forEach((field) => {
            if(!credentials.hasOwnProperty(field))
            {
                throw new BadRequestError(`Missing ${field} in request`)
            }
        })


        //Check to make sure a valid email is being inputted; 
        //If the email is missing an @, then throw an error for invalid emails
        if(credentials.email.indexOf('@') <= 0)
        {
            throw new BadRequestError('Invalid Email!')
        }


        //Assure that duplicate information does not exist within the database. 
        //If an email already exists, then throw a bad request error detailing that a duplicate email was inputted
        const existingUser = await User.fetchUserByEmail(credentials.email)
        if(existingUser)
        {
            throw new BadRequestError(`Duplicate email: ${credentials.email}`)
        }


        //To protect pertinent user information, hash the given password using bcrypt to store within the database
        //Lowercase the given email to assure more thorough query searching when fetching the user by email
        const hashedPw = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)
        const lowercaseEmail = credentials.email.toLowerCase()


        //Insert all pertinent information into the users table given the information form request body
        //Display the information back to the user including the hashed password
        const results = await db.query(`
            INSERT INTO users 
            (
                email,
                name,
                password
            )
            VALUES ($1, $2, $3)
            RETURNING id, email, name, password, created_at
        `, [lowercaseEmail, credentials.name, hashedPw])


        //Return the only the user's email and name
        const user = results.rows[0]
        return User.makePublicUser(user)
    }




    //FUNCTION TO MAKE A QUERY RETURNING AN EXISTING USER BY EMAIL
    static async fetchUserByEmail(email)
    {
        //If no email was provided to check for existing user, throw an error
        if(!email)
        {
            throw new BadRequestError("No email provided")
        }


        //Make a query to the database to find a matching email to find the user
        //Lowercase the email of the user
        const query = `SELECT * FROM users WHERE email = $1`
        const results = await db.query(query, [email.toLowerCase()])


        //Return the exisitng user
        const user = results.rows[0]
        return user
    }







    //FUNCTION TO MAKE A QUERY RETURNING AN EXISTING USER BY ID
    static async fetchUserById(userId)
    {
        if(!userId)
        {
            throw new BadRequestError("No user id provided!")
        }

        const query = `SELECT * FROM users WHERE id = $1`
        const results = await db.query(query, [userId.id])

        const user = results.rows[0]
        const publicUser = User.makePublicUser(user)
        return publicUser
    }
}




module.exports = User