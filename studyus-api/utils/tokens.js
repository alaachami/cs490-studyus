//IMPORT JSON WEB TOKENS PACKAGES AND SECRET KEY FROM CONFIG FILE
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require('../config')




//Create a token based on the provided data from user and secret key
//Tokens will expire every 24 hours
const generateToken = (data) => jwt.sign(data, SECRET_KEY, {expiresIn : "24h"})




//Create a new user token given the information of the user
const createUserJwt = (user) => {
    const payload = {
        email: user.email,
        isAdmin: user.isAdmin || false
    }

    return generateToken(payload)
}




//Validate the json token and verify it exists when combined with calls from security middleware
//If an error occurs, return nothing,
//If verified, return the decoded token.
const validateToken = (token) => {
    try
    {
        const decoded = jwt.verify(token, SECRET_KEY)
        return decoded
    }
    catch(error)
    {
        return {}
    }
}



//MODULE EXPORTS
module.exports = {
    generateToken,
    createUserJwt,
    validateToken
}