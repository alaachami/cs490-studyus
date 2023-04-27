// ****** IMPORTANT ******
// When running the auth tests, go to db.js and comment out the ssl in the db variable.
// SSL is needed for running the deployed backend, but for testing it locally it must be
// disabled for the local backend to work.


//IMPORT THE SUPER TEST CONFIG, APP, TOKENS, AND DATABASE CALLBACKS
const request = require("supertest")
const app = require("../app")
const tokens = require("../utils/tokens")
const {UnauthorizedError, BadRequestError} = require("../utils/errors")
const User = require("../models/user")
const {commonBeforeAll, commonBeforeEach, commonAfterAll, commonAfterEach} = require("./common")



//DATABASE COMMANDS - Assures that everytime an action occurs with the database which in this case is a user insertion,
//Rollback all actions perfomed with the datbase once testing ends
//Ensures that test can be used repeatedly without the ned to keep error checking working models
beforeAll(commonBeforeAll)
afterAll(commonAfterAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)


//Create a token for a test user using the tokens utils
const testToken = tokens.createUserJwt({email: "testuser@njit.edu"})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Creates a new user with email and name parameters
const newUser = 
{
    email: "testuser@njit.edu",
    name: "Test User"
}




//TEST THE USER MODELS INCLUDING REGISTER AND LOGIN FUNCTIONALITY
describe("User Models", () => {
    //Test that a user can be properly registered and will return the correct information back to the client-side
    describe("Test User Registration", () => {


        //Test that a user can be registered; Should return the id, email, and fullname of the user
        test("User can register with proper credentials", async () => {
            //Register the fake user into the database
            const user = await User.register({ ...newUser, password: "pw"})
            //Register request should return a JSON body containing the new id, email, and fullName of the user
            expect(user).toEqual({
                id: expect.any(Number),
                email: newUser.email,
                name: newUser.name
            })
        })


        //Test that a user receives a BadRequestError if they try to register with a pre-existing email
        test("Registering with duplicate email throws an error", async () => {
            //Make sure that there is only one assertion being received when the function executes
            expect.assertions(1)

            //Register a user into the system and then re-register another user with the same email
            //Request should throw a BadRequestError detailing that the user provided a duplicate email
            try
            {
                await User.register({ ...newUser, password: "pw"})
                await User.register({ ...newUser, password: "pw"})
            }
            catch(error)
            {
                expect(error instanceof BadRequestError).toBeTruthy()
            }
        })
    })



    //Test that a user can lgoin successfully if proper credentials are provided,
    //If wrong password and email combination is provided, test that unauthorized error is thrown
    describe("Test User Login", () => {

        //Test that a user can login with the proper credentials and the correct profile information is returned
        test("User can login with proper credentials", async () => {
            //Register a test user into the database
            const registerUser = await User.register({ ...newUser, password: "pw"})
            //Make a request to login the user with the correct email and password combo
            const loginUser = await User.login({...newUser, password: "pw"})

            //Assure that JSON response includes the user's id, email, and name
            expect(loginUser).toEqual({
                id: expect.any(Number),
                email: newUser.email,
                name: newUser.name
            })
        })


        //Test that a user will get an unauthorized error if they login with invlaid credentials
         test("Logging in with invalid email/password combo throws unauthorized error", async () => {
            //Make sure that there is only one assertion being received when the function executes
            expect.assertions(1)

            //Check that when a user attempts to login with the wrong password, an unauthrozied error is thrown from the request
            try
            {
                const loginUser = await User.login({...newUser, password: "wrongPw"})
            }
            catch(error)
            {
                expect(error instanceof UnauthorizedError).toBeTruthy()
            }
         })
    })
})
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/*TEST THE AUTH ROUTES TO ASSURE THAT A USER CAN LOGIN, REGISTER, AND AUTHENTICATE USING /AUTH/ME REQUEST
describe("Checking Auth Routes", () => {
    //Test the /auth/me route to ensure that a user can receive their information given the proper credentials and can throw an error if unauthenticated with tokens
    describe("GET REQUEST /auth/me", () => {

        
        //Test that a user can receive their profile information if they are authenticated using the tokens
        test("Authenticated user receives their profile when hitting endpoint", async () => {

            //Register a test user into the database
            const registerUser = await User.register({ ...newUser, password: "pw"})
            //Make a request to login the user with the correct email and password combo
            const loginUser = await request(app).post("/auth/login")

            const testToken = loginUser.token

            //Make a request to the route using the token generated for the test user in the authorization header
            const res = await request(app).get("/auth/me").set("Authorization", `Bearer ${testToken}`)
           
            //Request should send back the user's id, email, and full name
            expect(res.body).toEqual({
                id: expect.any(Number),
                email: "testuser@njit.edu",
                name: "Test User"
            })
        })


        //Test that a user will receive an unauthenticated error if an authorization header with the user's token is not provided
        test("Unauthenticated requests throw a 401 error", async () => {
            //Send a reuqest to the route without an authorization header; Should throw an unauthenticated error
            const res = await request(app).get("/auth/me")
            expect(res.statusCode).toEqual(401)
        })
    })
})*/