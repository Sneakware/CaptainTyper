var React = require('react');

var Text = require('./Text');
var Game = require('./Game');

module.exports = class App extends React.Component {

  render () {
    return (
      <div>
        <Game />
        <Text />
      </div>
    );
  }

};
