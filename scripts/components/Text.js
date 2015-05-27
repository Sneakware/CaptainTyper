React = require('react');
Utils = require('../Utils');

module.exports = class Text extends React.Component {

  getWpm (keyCount, errorCount) {
    return ((keyCount / 5) - errorCount) / time;
  }

  clear () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  createCursor () {
    this.ctx.fillStyle = 'green';
    var width = this.ctx.measureText(this.state.text[this.state.currentIndex]).width;
    this.ctx.fillRect(10 + width, this.canvas.height / 2 + 10, this.state.currentIndex * width, 5);
  }
  
  keyPress (e) {
    var c = String.fromCharCode(e.keyCode);
    if (c === this.state.text[this.state.currentIndex]) {
      this.setState({ currentIndex: this.state.currentIndex + 1 });
    } else {
      this.setState({ currentIndex: 0 });
    }
  }

  draw () {
    this.clear();

    var pad = 30;
    var boxHeight = this.canvas.height - 20;

    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(10, 10, this.canvas.width - 20, boxHeight);
    this.ctx.fillStyle = '#ccc';

    this.ctx.globalCompositeOperation = 'source-atop';
    this.ctx.fillStyle = 'white';

    this.ctx.font = '30px monospace';
    this.ctx.fillText(this.state.text, pad, boxHeight / 2 + 10);

    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(this.canvas.width - pad, 0, pad, this.canvas.height);

    this.ctx.globalCompositeOperation = 'source-over';
    this.createCursor();
  }

  componentDidMount () {

    this.canvas = this.refs.textbox.getDOMNode();
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = window.innerWidth;
    this.canvas.height = 200;

    Utils.doRequest('http://restock.io/api/S').then(function (res) {
      this.setState({ text: res, currentIndex: 0 });
    }.bind(this));

    window.addEventListener('keypress', this.keyPress.bind(this), false);
  }

  render () {
    
    if (this.state && this.state.text) { this.draw(); }

    return (
      <canvas ref="textbox" className="textbox"></canvas>
    )
  }

};
