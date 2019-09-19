const express = require('express')
const path = require('path')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(express.static(path.join(__dirname, '/public')))

io.on('connection', socket => {
  console.log('A new user connected! ✨')
  socket.on('disconnect', () => {
    console.log('A user has disconnected.')
  })
  socket.on('chat message', msg => {
    console.log('message: ' + msg)
  })
})

http.listen(7165, () => {
  console.log('listening on port 7165')
})
