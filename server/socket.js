'use strict';

var socketServer = require('http').createServer();
var io = require('socket.io')(socketServer);
var _ = require('lodash');

var db = require('mongojs')('mongodb://zavatta:' + process.env.NODE_PASS + '@ds045948.mongolab.com:45948/captaintyper', ['text']);

var rooms = {
  test: {
    players: []
  }
};

io.on('connection', function (socket){

  socket.on('launch', function (msg) {
    if (!_.isObject(msg) || !_.isString(msg.room)) { return ; }

    db.text.count({}, function (err, count) {
      if (err) { return console.log(err); }

      db.text.find().limit(-1).skip();
    });

    io.to(msg.room).emit({ text: 'yolo' });
  });

  socket.on('list', function () {
    socket.emit('list', rooms);
  });

  socket.on('ready', function (msg) {
    if (!socket.activeRoom || Object.keys(rooms).indexOf(socket.activeRoom) === -1) { return; }

  });

  socket.on('create', function (msg) {

    if (!_.isObject(msg) || !msg.room || !_.isString(msg.room) ||
        rooms[msg.room]) { return ; }

    rooms[msg.room] = {
      players: [{ id: socket.id, ready: false }]
    };

    socket.join(msg.room);

  });

  socket.on('join', function (msg) {

    if (!_.isObject(msg) || !msg.room || !_.isString(msg.room) ||
        !rooms[msg.room]) { return ; }

    rooms[msg.room].players.push({ id: socket.id, ready: false });

    if (socket.activeRoom) { socket.leave(msg.room); }
    socket.activeRoom = msg.room;

    socket.emit('joined', msg.player);
    socket.join(msg.room);

  });

  socket.on('disconnect', function () {

    if (socket.activeRoom && rooms[socket.activeRoom]) {
      var room = rooms[socket.activeRoom];
      var index = room.players.map(function (p) { return p.id; }).indexOf(socket.id);
      if (room.players.length === 1) {
        rooms.players.splice(index, 1);
      } else {
        room.players.splice(index, 1);
      }
    }

  });

});

socketServer.listen(3000);
