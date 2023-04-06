const app = require('./app')
const {PORT} = require("./config")

const { v4:uuiV4 } = require('uuid')

const server = require('http').Server(app)
const io = require('socket.io')(server)
//const PORT = process.env.PORT || 3001
io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        socket.to(roomId).broadcast.emit('user-connected', userId)
    })
})

server.listen(PORT, () => {
    console.log(`🚀 Server listening at http://localhost:${PORT}`)
})