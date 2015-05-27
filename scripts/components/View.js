React = require('react');

module.exports = class View extends React.Component {

  componentDidMount () {

    this.canvas = this.refs.viewbox.getDOMNode();
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = window.innerWidth;
    this.canvas.height = 400;

    this.ctx.fillStyle = '#268bd2';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

  }

  render () {
    return (
      <canvas ref="viewbox"></canvas>
    );
  }

};
