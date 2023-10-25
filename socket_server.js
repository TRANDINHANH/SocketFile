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
var cmsDataInfo = null;
// Xử lý tải lên
io.on('connection', (socket) => {

  
  socket.on('primary-clientId-from-file-server', (cmsdata) => {
    console.log('clientId nhan duoc: ' + cmsdata.id);
    cmsDataInfo = cmsdata;
    console.log('clientId : ' + cmsdata.id);
  });
  socket.on('get-image-to-primary-from-file-server', (imgSrc) => {
    console.log('clientId : ' + cmsDataInfo.id);
    console.log('clientId flag : ' + cmsDataInfo.flag);
    if(cmsDataInfo.flag == '1'){
      io.to(cmsDataInfo.id).emit('get-image-to-primary-flag-1', imgSrc);  
    }
    if(cmsDataInfo.flag == '2'){
      io.to(cmsDataInfo.id).emit('get-image-to-primary-flag-2', imgSrc);  
    }
    console.log('imgSrc: ' + imgSrc);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
