'use strict';

var socketServer = require('http').createServer();
var io = require('socket.io')(socketServer);

io.on('connection', function (socket){

  console.log('here');

  socket.on('event', function (data) {
  });

  socket.on('disconnect', function () {
  });

});

socketServer.listen(3000);
