//require stuff
const express = require('express');
const socket = require('socket.io');

//app setup
const port = process.env.PORT || 3000;
const app = express();
const server = app.listen(port, function(){
  console.log("listening on port: " + port);
  console.log(`URL: http://localhost:${port}`);
})

//wha files will we need
app.use(express.static('public'));

//socket setup
const io = socket(server);

//add messaging/event code
io.on('connection', (socket) =>{
  console.log(`connection made id: ${socket.id}`);

  socket.on('update', (player, id) =>{
    socket.broadcast.emit("render player", player, id);
  })
})
