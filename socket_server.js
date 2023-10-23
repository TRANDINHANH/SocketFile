var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling'],
    credentials: true
  },
  allowEIO3: true
});
var SocketIOFile = require('socket.io-file');
const express = require('express');
const cors = require('cors');

const port = 4000;


app.use(cors());
app.use(express.static('node_modules'));
var clientId = null;
// Xử lý tải lên
io.on('connection', (socket) => {

  
  socket.on('primary-clientId-from-file-server', (id) => {
    console.log('clientId nhan duoc: ' + id);
    clientId = id;
    console.log('clientId : ' + clientId);
  });
  socket.on('get-image-to-primary-from-file-server', (imgSrc) => {
    console.log('clientId : ' + clientId);
    io.to(clientId).emit('get-image-to-primary', imgSrc);  
    console.log('imgSrc: ' + imgSrc);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
