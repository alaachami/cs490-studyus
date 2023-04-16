const app = require('./app')
const {PORT} = require("./config")

const { v4:uuiV4 } = require('uuid')

const server = require('http').Server(app)
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
})
//const PORT = process.env.PORT || 3001


server.listen(PORT, () => {
    console.log(`🚀 Server listening at http://localhost:${PORT}`)
})