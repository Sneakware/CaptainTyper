var path = require('path');
var webpack = require('webpack');

module.exports = {

  cache: true,
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
        loader: 'jsx-loader?insertPragma=React.DOM&harmony'
      }, {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'styles')
        ],
        loader: 'style-loader!css-loader'
      }
    ]
  }

};
