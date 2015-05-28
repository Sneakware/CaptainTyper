React = require('react');

module.exports = class View extends React.Component {

  componentDidMount () {

    this.canvas = this.refs.viewbox.getDOMNode();
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = window.innerWidth;
    this.canvas.height = 600;

    this.ctx.fillStyle = '#268bd2';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    var water = this.canvas.height / 2 + 50;
    this.ctx.fillStyle = '#073642';
    this.ctx.fillRect(0, water, this.canvas.width, this.canvas.height / 2);

    this.ctx.fillStyle = '#2aa198';
    this.ctx.fillRect(0, water, this.canvas.width, 5);

  }

  render () {
    return (
      <canvas ref="viewbox"></canvas>
    );
  }

};
