//Import the database into the generalized testing file
const db = require("../db")

//Function to execute all the database actions that will occur for the tests to take place
async function commonBeforeAll()
{
    //any database actions
    //we want to take before the tests
}


//Function to wrap the testing and begin the database changes
async function commonBeforeEach()
{
    await db.query("BEGIN")
}


//Function to wrap the testing and rollback/remove the database changes
async function commonAfterEach()
{
    await db.query("ROLLBACK")
}


//Function to end the connection between the testing and the database
async function commonAfterAll()
{
    await db.end()
}


//MODULE EXPORTS ALL ASYNC FUNCTIONS
module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterAll,
    commonAfterEach
}