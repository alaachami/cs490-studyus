const express = require("express")
const router = express.Router()
const User = require("../models/user")
const {createUserJwt} = require("../utils/tokens")
const security = require("../middleware/security")

//POST REQUEST TO LOG A USER INTO THEIR ACCOUNT
router.post("/login", async (req,res,next) => {
    try
    {
        //Request will take in an email and password
        const user = await User.login(req.body)

        //Create the user's web token once user has been authenticated in login function
        const token = createUserJwt(user)

        //Return the user when authenticated
        return res.status(200).json({user: user, token: token})
    } 
    catch(error)
    {
        next(error)
    }
})





//POST REQUEST TO REGISTER A USER TO THE DATABASE
router.post("/register", async (req,res,next) => {
    try
    {
        //Request will take in an email, password, and full name from user
        const user = await User.register(req.body)

        //Create the user's web token once user has been authenticated in login function
        const token = createUserJwt(user)

        //Return the user when authenticated
        return res.status(201).json({user: user, token: token})
    } 
    catch(error)
    {
        next(error)
    }
})





//GET REQUEST TO AUTHORIZE THE IDENTITY OF THE USER
router.get("/me", security.requireAuthenticatedUser, async (req,res,next) => {
    try
    {
        //Get the email of the user from the local server
        const {email} = res.locals.user

        //Extract the user from the database using their email
        const user = await User.fetchUserByEmail(email)

        //Post the public information of the user (info that is not pertinent to the user's identity)
        const publicUser = User.makePublicUser(user)
        
        //Return the authorized user
        return res.status(200).json({user: publicUser})
    } 
    catch(error)
    {
        next(error)
    }
})






//GET REQUEST TO GET INFORMATION ABOUT A USER GIVEN THEIR ID
router.get("/users/:userId", security.requireAuthenticatedUser, async (req,res,next) => {
    try
    {
        //Extract the user id from the request parameter
        const {userId} = req.params
        //Post the public information of the user (info that is not pertinent to the user's identity)        
        const user = await User.fetchUserById({id: userId})

        //Return the authorized user
        return res.status(200).json({user: user})
    } 
    catch(error)
    {
        next(error)
    }
})


//Export all the login, register, and me routes
module.exports = router