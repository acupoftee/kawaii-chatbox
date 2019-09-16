const app = require('express')()
const http = require('http').createServer(app)

app.get('/', (req, res, next) => {
  res.send('<h1>Helloooooo world!</h1>')
})

http.listen(7165, () => {
  console.log('listening on port 7165')
})
