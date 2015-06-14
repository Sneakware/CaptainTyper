'use strict';

var port = 9000;

var webpack          = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config           = require('../webpack.config');

var webPackOptions = {
  publicPath        : config.output.publicPath,
  stats             : { colors: true },
  historyApiFallback: true
};

var server = new WebpackDevServer(webpack(config), webPackOptions);

server
  .listen(port, 'localhost', function (err) {
    if (err) { return console.log(err); }
    console.log('Listening at localhost:' + port);
  });

require('./socket');
