var port = 9000;

var webpack          = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config           = require('./webpack.config');

var webPackOptions = {
  publicPath         : config.output.publicPath,
  stats              : { colors: true },
  historyApiFallback : true
};

var server = new WebpackDevServer(webpack(config), webPackOptions);

server
  .listen(port, 'localhost', function (err) {
    if (err) { return console.log(err); }
    console.log('Listening at localhost:' + port);
  });

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
