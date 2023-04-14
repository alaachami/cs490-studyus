const app = require('./app')
const {PORT} = require("./config")

//create server on port 3000
const io = require('socket.io')(3000, {
    cors: {
      origin: '*',
    }
})
//const PORT = process.env.PORT || 3001



const users = {}

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})

// app.listen(PORT, () => {
//     console.log(`🚀 Server listening at http://localhost:${PORT}`)
// })