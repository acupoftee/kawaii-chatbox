const express = require('express')
const path = require('path')
const app = express()
const http = require('http').createServer(app)

app.use(express.static(path.join(__dirname, '/public')))
// app.get('/', (req, res, next) => {
//   res.sendFile(path.join(__dirname, '/public/index.html'))
// })

http.listen(7165, () => {
  console.log('listening on port 7165')
})
