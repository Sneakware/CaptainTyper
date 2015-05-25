React = require('react');
Utils = require('../Utils');

module.exports = class Text extends React.Component {

  getWpm (keyCount, errorCount) {
    return ((keyCount / 5) - errorCount) / time;
  }

  clear () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  write () {

    this.clear();

    Utils.doRequest('http://restock.io/api/S').then(function (res) {
      this.ctx.font = '30px monospace';
      this.ctx.fillText(res, 10, 30);
    }.bind(this));

  }

  componentDidMount () {
    this.canvas = this.refs.textbox.getDOMNode();
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = window.innerWidth;
    this.canvas.height = 200;

    this.write();
  }

  render () {
    return (
      <canvas ref="textbox" className="textbox"></canvas>
    )
  }

};
