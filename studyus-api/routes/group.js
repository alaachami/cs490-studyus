//IMPORT EXPRESS, ROUTER, AND SECURITY MIDDLEWARE
const express = require("express")
const router = express.Router()
const Groups = require("../models/groups")
const security = require("../middleware/security")




//FUNCTION TO LIST ALL THE GROUPS A USER BELONGS TO 
router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        //Retrieve the user information from the local server
        const { user } = res.locals
        //Call the listTeams function to get a list of all the teams a user created or is a member of
        const groupList = await Groups.listAllGroups({ user })
        //Return the list of all the teams if successful
        return res.status(200).json({ groupList: groupList })
    }
    catch (error) {
        next(error)
    }
})






//FUNCTION TO CREATE A NEW GROUP
router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        //Retrieve the user information from the local server
        const { user } = res.locals

        //Call the create team function to add a new team to the database using the user information and the new team info
        //Request body must have the name of the team, the members of the team, and the projects of a team
        //const group = await Groups.createGroup({ user: user, groupInfo: req.body })
        //Return the new group information if successful
        //return res.status(201).json({ group: group })

        // TEST SOLUTION
        const group = await Groups.createGroup({ user: user, groupInfo: req.body })
        const { id, name, subject, isbn, school, description, admin_id, capacity } = group

        return res.status(201).json({ group: { id, name, subject, isbn, school, description, admin_id, capacity } })

    }
    catch (error) {
        next(error)
    }
})





//FUNCTION TO RETURN A SPECIFIC GROUP BY THEIR ID
router.get("/:groupId", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        //Retrieve the team id from the given url
        const { groupId } = req.params

        //Retrieve the user information from the local server
       // console.log(res.locals)
        const { user } = res.locals
        //console.log(user)

        //Call the fetchTeamById function to find specific team information
        //Must provided the team id from the url
        const group = await Groups.fetchGroupById({ groupId: groupId, user: user })

        //Return the specific team information if successful
        return res.status(200).json({ group: group })
    }
    catch (error) {
        next(error)
    }
})





//FUNCTION TO ADD A NEW MEMBER TO A GROUP
router.post("/add", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        //Retrieve the team id from the given url
        const { groupId } = req.body
        //Retrieve the user information from the local server
        const { user } = res.locals
        //Call the addNewTeamMember function to update the members of a team
        //Request body must have the new member's email; If not, the request will be unsuccessful
        const updatedGroup = await Groups.addNewGroupMember({ groupId: groupId, newMember: req.body, user: user })

        //Return the new team information if successful
        return res.status(200).json({ group: updatedGroup })
    }
    catch (error) {
        next(error)
    }
})

//FUNCTION REMOVE MEMBER FROM A GROUP
router.post("/remove", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        //Retrieve the team id from the given url
        const { groupId } = req.body
        //Retrieve the user information from the local server
        const { user } = res.locals
        //Call the addNewTeamMember function to update the members of a team
        //Request body must have the new member's email; If not, the request will be unsuccessful
        const updatedGroup = await Groups.leaveGroup({ groupId: groupId, user: user })

        //Return the new team information if successful
        return res.status(200).json({ group: updatedGroup })
    }
    catch (error) {
        next(error)
    }
})






//FUNCTION TO CHECK IF A MEMBER IS VALID AND RETURN THE USERID
router.get("/user/:email", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        //Retrieve the email param from the given url
        const { email } = req.params;
        //Run the fetchUserById function to check if user exists in database using the email provided in request body
        const validUser = await Teams.fetchUserId(email)

        //Return the userId if successful
        return res.status(200).json({ userId: validUser })
    }
    catch (error) {
        next(error)
    }
})







//FUNCTION GET ALL MEMBER OBJECTS FOR A GROUP
router.get("/:groupId/members", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        // Retrieve the groupId param from the given URL 
        const { groupId } = req.params;
        console.log(groupId)

        //Retrieve the user information from the local server
        //console.log(res.locals)
        const { user } = res.locals

        //Run the fetchMembersForATeam function 
        // const members = await Groups.fetchMembersForAGroup({groupId: groupId, user: user });
        const members = await Groups.fetchMembersForAGroup(groupId, user);
        console.log(members)

        // Return the user array if successful
        return res.status(200).json({groupData: members})
    }
    catch (error) {
        next(error)
    }
})

//FUNCTION GET Capacity of a group
router.get("/:groupId/capacity", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        // Retrieve the groupId param from the given URL 
        const { groupId } = req.params;
        console.log(groupId)
    
        //Run the fetchMembersForATeam function 
        // const members = await Groups.checkGroupCapacity({groupId: groupId, user: user });
        const capacity = await Groups.checkGroupCapacity(groupId);
        console.log(capacity)

        // Return the user array if successful
        return res.status(200).json({capacity: capacity})
    }
    catch (error) {
        next(error)
    }
})

//FUNCTION TO SEARCH FOR GROUP
router.post("/search", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        // Retrieve the groupId param from the given URL 

        //Retrieve the user information from the local server
        //console.log(res.locals)
        const { user } = res.locals
        const { query } = req.body
        console.log(query)

        //Run the fetchMembersForATeam function 
        // const members = await Groups.fetchMembersForAGroup({groupId: groupId, user: user });
        const groupList = await Groups.searchForGroups(query, user);
        console.log(groupList)

        // Return the user array if successful
        return res.status(200).json({groupList: groupList})
    }
    catch (error) {
        next(error)
    }
})




/*
//FUNCTION TO RETURN AN ARRAY OF PROJECT OBJECTS FOR A SPECIFIC TEAM 
router.get("/:teamId/projects", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        // Retrieve the teamId param from the given URL 
        const { teamId } = req.params;

        //Retrieve the user information from the local server
        const { user } = res.locals

        //Run the fetchMembersForATeam function 
        const projects = await Teams.fetchProjectsForATeam({teamId: teamId, user: user });

        // Return the user array if successful
        return res.status(200).json({projects})
    }
    catch (error) {
        next(error)
    }
})*/





/*
router.get("/teams/users", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        //Retrieve the user information from the local server
        const { user } = res.locals

        //Run the fetchMembersFromMultipleTeams function to get all the id, name, and members' fullname of a team
        //Req body should have a field called teams: i.e. {teams: [1,2,3,4]}
        const members = await Teams.fetchMembersFromMultipleTeams({ user: user });

        // Return the teams array if successful
        return res.status(200).json({members: members})
    }
    catch (error) {
        next(error)
    }
})*/





//MODULE EXPORTS
module.exports = router