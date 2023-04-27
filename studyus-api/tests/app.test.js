//IMPORTING THE SUPERTEST CONFIGS, APP.JS, AND THE DATABASE
const request = require("supertest")
const app = require("../app")
const db = require("../db")




//RUNNING THE APPLICATION TESTING SUITE TO CHECK FOR INCORRECT ENDPOINTS AND HEALTH CHECKS
describe("Test the application (app.js)", () => {

    //Test whether the application will send a 404 not found error if an incorrect endpoint is requested
    test("Not Found for site 404", async () => {
        //Make the request to an endpoint that doesn't exist
        const res = await request(app).get("/incorrect-endpoint")
        //Check the status code for 404 not found
        expect(res.statusCode).toEqual(404)
    })


    //Test whether the application will send a 200 successful request status code when requesting the health check (should return the object ping: pong)
    test("Health Check Route Returns Valid Response", async () => {
        //Make the request to test get request health check
        const res = await request(app).get("/")
        //Check the stauts code for 200 success code
        expect(res.statusCode).toEqual(200)
        //Check the response body for correct health check body (ping: pong)
        expect(res.body).toEqual({"ping": "pong"})
    })
})




//Exit the testing suite once all tests have been performed
afterAll(async () => {
    await db.end()
})