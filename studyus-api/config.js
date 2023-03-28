//IMPORTING CONFIG DEPENDENCIES
require('dotenv').config()
require('colors')




//IMPORTING THE LISTENING PORT
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001
//IMPORTING THE SECRET KEY AND BCRYPT FACTOR
const BCRYPT_WORK_FACTOR = process.env.BCRYPT_WORK_FACTOR ? Number(process.env.BCRYPT_WORK_FACTOR) : 13;
const SECRET_KEY = process.env.SECRET_KEY;







//FUNCTION TO CREATE THE DATABASE URL (Takes in all environment variables from .env)
function getDatabaseUri()
{
    const dbUser = process.env.DATABASE_USER || 'postgres';
    const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : 'postgres';
    const dbHost = process.env.DATABASE_HOST || 'localhost';
    const dbPort = process.env.DATABASE_PORT || 5432;
    const dbName = process.env.DATABASE_NAME || 'studyus';

    //If a database url is supplied, use that url. Otherwise, create a db connection string.
    return process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
}





//CONSOLE LOGGING THE CURRENT URI BEING USED AND OTHER SYSTEM INFORMATION
console.log("StudyUs Config: ".red)
console.log("PORT: ".blue, PORT)
console.log("StudyUs URI: ".blue, getDatabaseUri())
console.log("-----")





//MODULE EXPORTS
module.exports = {
    PORT,
    SECRET_KEY,
    BCRYPT_WORK_FACTOR,
    getDatabaseUri
}