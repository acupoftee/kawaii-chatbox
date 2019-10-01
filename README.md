# Kawaii Chatbox & An Intro to Web Sockets with Socket.IO ✨

This is a skill building project for understanding the fundamentals of Web Sockets, and Socket.IO with Express. 
<p align="center">
<img src="https://i.imgur.com/DprgLUg.jpg" width="545">
</p>

**Tools:**
* HTML  
* SCSS
* JavaScript
* jQuery
* Express
* Node
* Socket.io

# What's a Websocket
A web socket is a bi-directional protocol that helps us communicate with a client, and a server in *real time*! 

<p align="center">
<img src="https://i.imgur.com/cmF7Zys.png" width="500">
</br>
<small>Web socket diagram</small>
</p>

Think of a group chat in Slack or Discord. When you're sending a message about that upcoming deadline to your colleagues, or voice chat in a video game where you're shouting at your teammates for not completing the objective, everyone in the group chat will receive that message immediately after you've sent it. 

<p align="center">
<img src="https://thumbs.gfycat.com/ScaryLimpingAbyssiniancat-size_restricted.gif">
</p>

### Why Use Web Sockets?

Web sockets were designed around the HTTP send/recieve paradigm. Because web sockets are real time and similar to Peer-to-Peer (P2P), we don't have to wait for a response from either endpoint, and we don't have to deal with the overhead that comes with HTTP requests like opening a new connection, closing a connections, and polling servers for updates. This wouldn't be useful if we want a quick response.

<p align="center">
  <img src="https://media1.giphy.com/media/12T06oyfpXSoNy/giphy.gif?cid=790b7611de57efbcd0528d61fdfb90d6fdf380071829ffb9&rid=giphy.gif" height="300">
</p>

Websockets however are much more flexible and reliable for this type of communication. We don't need to repeat GET requests often just to see if there's anything new. The connection stays open, and data can be sent between clients and servers at any time. 

<p align="center">
<img src="https://media.giphy.com/media/KZe6AUvEcZhvxvr2y5/giphy.gif" width="300">
</p>

There are instances where HTTP would be best. One reason is that it's supported by all web browsers. It's also better for apps with a large amount of connected users since the server wouldn't need to sustain a large number of open connections. 

Another alternative to websockets are [Server-Sent Events](https://en.wikipedia.org/wiki/Server-sent_events) (SSE). This creates a uni-directional connection between the client and the server--**only the server needs to push data to the client**. 

## Socket.io
SocketIO is a JavaScript framework for building apps with websockets! Below are two code snippets used for the client and server to send data back and fourth to each other.  
<p align="center">
<img src="https://siriuswrites.files.wordpress.com/2018/04/koyori-rally.gif" width="400">
</p>


**Server Code**

In `server.js`, we establish 3 event listeners: 
* Connection event
  * A client's entered the chat
* Disconnection event
  * A client leaves the chat
* Chat message event
  * A client's sent a message
```js 
const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
  console.log('A new user connected! ✨')

  socket.on('disconnect', () => {
    console.log('A user has disconnected.')
  })

  // Listens for the client chat event
  socket.on('chat message', msg => {
    // send the message out to everyone
    io.emit('chat message', msg)
  })
})
```
<p align="center">
<small>server.js</small>
</p>

There is an additional method we're calling called `emit()`. This is how we send events from the server to the client, and vice versa. In `server.js`, `emit()` sends a `'chat message'` event to the client whenever it receives a new message from the client. 

**Client Code**

In `index.html`, we also have an event listener and event emitter. 

```html
  <script>
    const socket = io()
    const chatBubbleDiv = '<div class="bubble"></div>'
    $('form').submit(e => {
      // prevent page refresh 
      e.preventDefault()

      // send chat event to the server
      socket.emit('chat message', $('#message').val())

      // clear the message in the form
      $('#message').val('')
      return false
    })
    
    // display sent message to all clients
    socket.on('chat message', msg => {
        $('#messages').append($(chatBubbleDiv).text(msg))
    })
  </script>
  ```
  <p align="center">
<small>index.html</small>
</p>

The event emitter tells the server when a user sends a message. Then, when the server sends a `'chat message'` event back to the client, it displays the messsage to all connected users.


* * *
*Thanks for reading! If you like what you see, check out my other work on [DEV](https://dev.to/acupoftee), or lets [connect](https://linkedin.com/in/bethy-diakabana/)!*