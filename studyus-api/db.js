//IMPORTING DATABASE URI FROM CONFIG FILE AND IMPORTING PG CLIENT
const {Client} = require('pg')
const {getDatabaseUri} = require('./config')
require('colors')



//INSTANTIATE NEW PG CLIENT TO HOLD DATABASE URI
const db = new Client({ connectionString: getDatabaseUri() })




//CALL CONNECT METHOD TO CONSOLE CONNECTION INFORMATION TO THE SCREEN
db.connect((error) => {
    if(error)
    {
        console.error("Connection error".red, error.stack)
    }
    else
    {
        console.log("Successfully connected!".blue)
    }
})



module.exports = db;