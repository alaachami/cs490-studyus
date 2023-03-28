//IMPORT JSON WEB TOKENS, ERROR HANDLING, AND SECRET KEY
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require('../config')
const {UnauthorizedError} = require('../utils/errors')


//Create a function to extract the json token from request header
//Split the authorization header and assure that the header is Bearer and extract the token
//If not, then return undefined
const jwtFrom = ({headers}) => {
    if(headers?.authorization)
    {
        const [scheme, token] = headers.authorization.split(" ")
        if(scheme.trim() === "Bearer")
        {
            return token
        }
    }

    return undefined
}





//Create a function to attach the user to the response object
//If the token can be verified and valid user is using the key,
//Then, token can be accessed through res.locals
//If not, return error
const extractUserFromJwt = (req,res,next) => {
    try
    {
        const token = jwtFrom(req)
        if(token)
        {
            res.locals.user = jwt.verify(token, SECRET_KEY)
        }
        return next()
    }
    catch(error)
    {
        return next()
    }
}





//create a function to verify an authorized user exists
//If the user does not exists on res.locals and if that user email does not exists,
//Then Unauthorized error and user will not be allowed to continue
const requireAuthenticatedUser = (req,res,next) => {
    try
    {
        const {user} = res.locals;
        if(!user?.email)
        {
            throw new UnauthorizedError()
        }
        return next()
    }
    catch(error)
    {
        return next(error)
    }
}


module.exports = 
{
    extractUserFromJwt,
    requireAuthenticatedUser
}