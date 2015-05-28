var React = require('react');

var Text = require('./Text');
var View = require('./View');

module.exports = class App extends React.Component {

  componentWillMount () {

    this.setState({
      players: [{
        name: 'one',
        x: 100,
        team: 'white'
      }, {
        name: 'two',
        x: 1500,
        team: 'red'
      }]
    });

  }

  render () {
    return (
      <div>
        <View players={this.state.players} />
        <Text />
      </div>
    );
  }

};
