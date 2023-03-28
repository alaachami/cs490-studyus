//Importing express / app
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

//Create Express Application
const app = express()

//APP USE - Parse incoming request bodies
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

//Server Health Check
app.get('/', async(req,res,next) => {
    res.status(200).json({"ping":"pong"})
})

//ERROR HANDLING - Not Found
app.use((req,res,next) => {
    return next(new NotFoundError())
})

app.use((error, req, res, next) => {
    const status = error.status || 500
    const message = error.message
    return res.status((status)).json({
        error: {message, status}
    })
})

//MODULE EXPORTS
module.exports = app