React = require('react');

module.exports = class View extends React.Component {

  componentDidMount () {

    this.canvas = this.refs.viewbox.getDOMNode();
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = window.innerWidth;

  }

  render () {
    return (
      <canvas ref="viewbox"></canvas>
    );
  }

};
