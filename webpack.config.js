var path = require('path');
var webpack = require('webpack');

module.exports = {

  cache: false,
  watch: true,

  entry: [
    'webpack-dev-server/client?http://localhost:9000',
    './scripts/app.js'
  ],

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'scripts')
        ],
        loader: 'babel'
      }, {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, 'styles')
        ],
        loader: 'style!css!sass'
      }
    ]
  },

  externals: {
    react: 'React',
    moment: 'moment'
  }

};
