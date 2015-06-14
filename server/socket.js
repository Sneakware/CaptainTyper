'use strict';

var socketServer = require('http').createServer();
var io = require('socket.io')(socketServer);
var _ = require('lodash');

var db = require('mongojs')('mongodb://zavatta:' + process.env.NODE_PASS + '@ds045948.mongolab.com:45948/captaintyper', ['text']);

// var rooms = {};
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

  socket.on('create', function (msg) {

    if (!_.isObject(msg) || !msg.room || !_.isString(msg.room) ||
        rooms[msg.room]) { return ; }

    rooms[msg.room] = {
      players: [socket.id]
    };

    socket.join(msg.room);

  });

  socket.on('join', function (msg) {

    if (!_.isObject(msg) || !msg.room || !_.isString(msg.room) ||
        !rooms[msg.room]) { return ; }

    rooms[msg.room].players.push(socket.id);

    socket.emit('joined', { msg.player });

    socket.join(msg.room);

  });

  socket.on('disconnect', function () {

    Object.keys(rooms).forEach(function (name) {
      var room = rooms[name];
      if (room.players.indexOf(socket.id) !== -1) {
        var index = room.players.indexOf(socket.id);
        if (room.players.length === 1) {
          // delete or not?
          room.players.splice(index, 1);
        } else {
          room.players.splice(index, 1);
        }
      }
    });

  });

});

socketServer.listen(3000);
