require('../styles/app.css');

var React = require('react');

var Text = require('./components/Text');
var View = require('./components/View');

var App = React.createClass({

  render () {
    return (
      <div>
        <View />
        <Text />
      </div>
   );
  }

});

React.render(<App />, document.getElementById('render'));
