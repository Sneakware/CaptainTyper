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

function removeFromRoom (socket) {

  if (socket.activeRoom && rooms[socket.activeRoom]) {
    var room = rooms[socket.activeRoom];
    if (!room.players) { return ; }
    var index = room.players.map(function (p) { return p.id; }).indexOf(socket.id);
    if (room.players.length === 1) {
      room.players.splice(index, 1);
    } else {
      room.players.splice(index, 1);
    }
    socket.leave(socket.activeRoom);
  }

}

/**
 * Connection event on the socket server
 *
 * @param socket {Object}
 */
io.on('connection', function (socket) {

  /**
   * Launch a game, find a random text in the DB and broadcast it to the room
   */
  socket.on('launch', function () {
    if (socket.rooms.length !== 2) { return console.log('No room joined'); }

    var roomName = socket.rooms[1];
    var room = rooms[roomName];

    var player = room.players[room.players.map(function (p) {
      return p.id;
    }).indexOf(socket.id)];

    if (!room || !player || !player.leader) { return console.log('No such room, or no leader'); }

    // Shoud find a random doc
    db.text.count({}, function (err, count) {
      if (err) { return console.log(err); }

      var rand = Math.floor(Math.random() * (count + 1));
      db.text.find().limit(-1).skip(rand).next(function (err, text) {
        if (err) { return console.log(err); }
        io.to(roomName).emit('launch', { text: text.value });
      });
    });

  });

  /**
   * Server list request
   */
  socket.on('list', function () {
    socket.emit('list', rooms);
  });

  /**
   * Set a player as ready in the room
   */
  socket.on('ready', function (msg) {
    if (!socket.activeRoom || Object.keys(rooms).indexOf(socket.activeRoom) === -1) { return; }

  });

  /**
   * Create a new room, and join it
   */
  socket.on('create', function (msg) {

    if (!_.isObject(msg) || !msg.room || !_.isString(msg.room) ||
        rooms[msg.room]) { return ; }

    rooms[msg.room] = {
      players: [{ id: socket.id, ready: false, leader: true }]
    };

    socket.join(msg.room);

  });

  /**
   * Join a room
   */
  socket.on('join', function (msg) {

    if (!_.isObject(msg) || !msg.room || !_.isString(msg.room) || !rooms[msg.room]) { return ; }

    if (socket.activeRoom) { removeFromRoom(socket); }

    var room = rooms[msg.room];
    room.players.push({ id: socket.id, ready: false });
    if (room.players.length === 1) { room.players[0].leader = true; }

    socket.activeRoom = msg.room;
    socket.join(msg.room);
    socket.emit('joined', msg.player);

  });

  /**
   * User leave
   */
  socket.on('leave', function () {
    removeFromRoom(socket);
  });

  /**
   * On disconnect event, remove player from his room if he has one
   */
  socket.on('disconnect', function () {
    removeFromRoom(socket);
  });

});

socketServer.listen(3000);
