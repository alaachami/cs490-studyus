const db = require("../db")
const {BadRequestError, NotFoundError} = require("../utils/errors")
const User = require("./user")

class Groups
{
    //FUNCTION GET A LIST OF ALL THE GROUPS A USER IS A PART OF
    static async listAllGroups({user})
    {
        //Runs a query to find all the groups a user is a part of by : 
        //First, finding the id of the user given the user's email from the local server
        //And then matching this id to any of the groups where this id matches a member's id in a group
        const userId = await Groups.fetchUserIdFromEmail(user.email)
        const results = await db.query(
            `
                SELECT *
                FROM groups
                WHERE id IN (SELECT group_id FROM group_members where member_id = $1)
            `, [userId])
        
        //Return all the groups a user is a part of
        return results.rows
    }







    //FUNCTION TO CREATE A NEW group FOR THE USER
    //Takes in only the name of the group, members, and projects associated with the group
    //And then inserts the results of the query into the database
    static async createGroup({user, groupInfo})
    {
        //Checks that all required fields are present within the request body including name of the group, members, and projects
        //If part of the necessary fields are not present, then throw a bad request error detailing the missing field
        const requiredFields = ["name", "subject", "isbn", "school", "description", "capacity"]
        requiredFields.forEach((field) => {
            if(!groupInfo.hasOwnProperty(field))
            {
                throw new BadRequestError(`Required field ${field} missing from request!`)
            }
        })


        //Calls a separate query to find the id of the user given only the user's email
        const userId = await Groups.fetchUserIdFromEmail(user.email)


        //Inserts into the groups table the group name, members, projects, and id of the creator (in this case it is the user who created the group
        //To find the id of all the members, 
        //the query finds the id of all the users who have the same email as those from the members list (request body)
        //And then turns the results of the sub query into an integer array
        //To find the id of the user who created the group,
        //The query finds the id from the users table where the email matches the email of the user in the local serve
        const results = await db.query(
            `
                INSERT INTO groups
                (
                    name,
                    subject,
                    isbn,
                    school,
                    description,
                    admin_id,
                    capacity
                )
                VALUES($1, $2, $3, $4, $5, $6, $7)
                RETURNING id, name, subject, isbn, school, description, admin_id, capacity
            `, [groupInfo.name, groupInfo.subject, groupInfo.isbn, groupInfo.school, groupInfo.description, userId, groupInfo.capacity])

        const groupId = results.rows[0].id;
        // Add the person creating the group as the admin of the group
        const updateResults = await db.query(
            `
                INSERT INTO group_members
                (
                    group_id,
                    member_id,
                    is_admin
                )
                VALUES($1, $2, $3)
                RETURNING group_id, member_id, is_admin
            `, [groupId, userId, true])
        //Run a query to update the projects by appending the new group id to the existing array of groups 
        /*const updateResults = await db.query(
            `
                UPDATE groups
                SET groups = ARRAY_APPEND(groups, $1)
                WHERE id = any($2)
                RETURNING *
            `, [results.rows[0].id, groupInfo.projects])*/


        //Return the new group information
        return results.rows[0]
    }






    //FUNCTION TO RETURN A SPECIFIC group GIVEN THE group'S ID
    static async fetchGroupById({groupId, user})
    {
        //Calls a separate query to find the id of the user given the user's email
        const userId = await Groups.fetchUserIdFromEmail(user.email)

        //Runs a query to find the specific group's information using the group id
        //First, the query checks that the group's id matches the given id
        //And then checks if the user is a member of this group
        //If not, user is not authorized to access these groups and is given a not found error instead

        // Just fetches group by id
        const results = await db.query(
            `
                SELECT *
                FROM groups
                WHERE id = $1
            `, [groupId])


        //Check to see if the group has been found. If not, return a not found error
        const group = results.rows[0]
        if(!group)
        {
            throw new NotFoundError("Group was not found!")
        }

        //Return the group's information
        return group
    }




    


    //FUNCTION TO ADD A NEW group MEMBER TO AN EXISTING group. Uses their email as a parameter
    static async addNewGroupMember({groupId, newMember, user})
    {
        //If a new member was not provided, throw a bad request error detailing that the user needs to provide a member email
        if(!newMember)
        {
            throw new BadRequestError(`New user information is missing! Please provide an email!`)
        }

        //Run a separate query to find the id of the member who's email matches the given member email
        const newMemberId = await Groups.fetchUserIdFromEmail(newMember.email)

        //Run a separate query to determine whether the new member already exists within the members of the chosen group
        const existingMember = await Groups.checkExistingMember(newMemberId, groupId)


        //If the new member already exists within the members of a chosen group, throw a bad request error detailing duplicate member
        if(existingMember)
        {
            throw new BadRequestError(`Duplicate Member: ${newMember.email}! Member is already in this group!`)
        }

        //Run a query to find the id of the user who is making the request to add a new member
        const userId = await Groups.fetchUserIdFromEmail(user.email)


        //Run a query to update the members of group by first finding the specific group a user requested,
        //Then check whether user is authorized to access the group by checking if they are a creator of the group or a member
        //If this information matches, then update the members of a group by appending the new member id to the existing array
        //Return the new group information
        const results = await db.query(
            `
            INSERT INTO group_members
            (
                group_id,
                member_id,
                is_admin
            )
            VALUES($1, $2, $3)
            RETURNING group_id, member_id, is_admin
        `, [groupId, newMemberId, false])


        //Store the results of the new group information
        //If user is not authorized to change the group information or the groupId is not found or the array can not be updated
        //Then throw a not found error detailing that the request could not be executed
        const newgroup = results.rows[0]
        if(!newgroup)
        {
            throw new NotFoundError("Group was not found! Could not add new member!")
        }

        //Return the new group information with the updated members array
        return newgroup
    }







    //FUNCTION TO FIND A USER'S ID GIVEN ONLY THE USER EMAIL
    static async fetchUserIdFromEmail(email)
    {
        //If no email has been provided by previous queries/functions, return a bad request error
        if(!email)
        {
            throw new BadRequestError("No email provided")
        }

        //Run a query to find the id of the user who's email matches the given email
        const query = `SELECT id FROM users WHERE email = $1`
        const results = await db.query(query, [email])

        //Store the id of the user and return it
        const userId = results.rows[0].id
        return userId
    }






    //FUNCTION TO CHECK WHETHER THE GIVEN USER ALREADY EXISTS AS A MEMBER IN THE group
    static async checkExistingMember(memberId, groupId)
    {
        //If no member id is provided, then throw a bad request error
        if(!memberId)
        {
            throw new BadRequestError("No member id provided!")
        }

        //Run a query to find a specific group by id and then compare the given member id to the members of that group
        //Store the results of the query
        const results = await db.query(
            `
                SELECT * 
                FROM group_members 
                WHERE member_id = $1 AND group_id = $2
            `,[memberId, groupId])

        
        //If a member is found, return the information. If they are not a member, return nothing.
        return results.rows[0]
    }





    //FUNCTION TO RETURN AN ARRAY OF USERS FROM A group
    static async fetchMembersForAGroup(groupId, user)
    {
        //If no group id is provided, then throw a bad request error
        if(!groupId)
        {
            throw new BadRequestError("No group id provided!")
        }

        // Fetch the group information 
        // const group = await Groups.fetchGroupById(groupId, user)

        //Runs a query to find all users from the group 
        //If successful, returns all the users as an array
        const results = await db.query(
            `
                SELECT id, name, email
                FROM users
                WHERE id IN (SELECT member_id FROM group_members WHERE group_id = $1)
            `,[groupId])
        
        //Return all the users that are apart of a group 
        return results.rows
    }

    // FUNCTION TO SEARCH FOR GROUP GIVEN TEXT QUERY
    static async searchForGroups(query, user)
    {

        // Fetch the group information 
        // const group = await Groups.fetchGroupById(groupId, user)

        //Runs a query to find all groups matching search query in description/title
        //If successful, returns all the groups as an array
        const results = await db.query(
            `
                SELECT *
                FROM groups
                WHERE name ILIKE '%' || $1 || '%'
                OR description ILIKE '%' || $1 || '%'
                OR school ILIKE '%' || $1 || '%'
                OR subject ILIKE '%' || $1 || '%'
            `,[query])
        
        //Return all the users that are apart of a group 
        return results.rows
    }

    

    /*
    //FUNCTION TO RETURN AN ARRAY OF PROJECTS THAT A group HAS
    static async fetchProjectsForAgroup({groupId})
    {
        //If no group id is provided, then throw a bad request error
        if(!groupId)
        {
            throw new BadRequestError("No group id provided!")
        }

        // // Fetch the group information 

        //Runs a query to find all projects that a group is apart of
        //If successful, returns all the projects as an array
        const results = await db.query(
            `
                SELECT * FROM projects WHERE $1 = any(projects.groups) 
            `,[groupId])
        
        //Return all the projects that a group is working on
        return results.rows
    }


    */





    /*
    //FUNCTION TO GET THE group ID, NAME, AND NAMES OF MEMBERS FOR MULTIPLE groupS
    static async fetchMembersFromMultiplegroups({user})
    {
        const groupList = await groups.listAllgroups({user: user})
        
        
        const groupIds = []
        groupList.map((group) => {
            groupIds.push(group.id)
        })
        
        //Create an array to store all the group information (id, name, members)
        let groupsTableData = []



        //Ensure that all the asynchronous functions are being completed before returning any statement using Promise.all
        return Promise.all(
            //Map through the ids of all the groups
            groupIds?.map(async(group) => {

            //For every group, get the list of all the members and the group information 
            const memberList = await groups.fetchMembersForAgroup({groupId: group, user: user})
            const groupInfo = await groups.fetchgroupById({groupId: group, user: user})

            //Iterate through the member objects in member List and extract the full name, then store it in an array
            let memberNames = []
            memberList?.forEach((member) => {
                memberNames.push(member.full_name)
            })

            //Push the new object information into the groupsTableData
            groupsTableData.push({groupId: group, groupName: groupInfo.name, members: memberNames.join(", ")})
        })
        ).then(() => {
            //Return all the groups information (array of objects)
            return groupsTableData
        })
    }*/
}

module.exports = Groups