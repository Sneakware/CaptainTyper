var React = require('react');
var Utils = require('../Utils');

module.exports = class View extends React.Component {

  drawPlayer (x, y, o, teamColor) {

    this.ctx.save();

    if (!o) {
      this.ctx.translate(x + x, y - 360);
      this.ctx.scale(1, -1);
      this.ctx.rotate(Math.PI);
    }

    this.ctx.fillStyle = teamColor;
    this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.lineWidth = 2;

    this.ctx.beginPath();

    this.ctx.moveTo(x, y);

    // bottom
    this.ctx.lineTo(x + 100, y);
    this.ctx.lineTo(x + 103, y - 5);
    // top
    this.ctx.lineTo(x + 105, y - 20);
    this.ctx.lineTo(x + 85, y - 20);
    // bridge
    this.ctx.lineTo(x + 80, y - 15);
    this.ctx.lineTo(x + 50, y - 15);
    // tower
    this.ctx.lineTo(x + 50, y - 20);
    // cannon
    this.ctx.lineTo(x + 80, y - 30);
    this.ctx.lineTo(x + 80, y - 32);
    this.ctx.lineTo(x + 80, y - 32);
    // tower
    this.ctx.lineTo(x + 50, y - 25);
    this.ctx.lineTo(x + 53, y - 35);
    this.ctx.lineTo(x + 20, y - 35);
    this.ctx.lineTo(x + 20, y - 30);
    this.ctx.lineTo(x + 23, y - 20);
    this.ctx.lineTo(x + 20, y - 15);
    // lower bridge
    this.ctx.lineTo(x + 10, y - 15);
    this.ctx.lineTo(x, y - 18);
    this.ctx.lineTo(x - 20, y - 18);
    this.ctx.lineTo(x - 18, y - 2);
    this.ctx.lineTo(x - 15, y);

    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.restore();
  }

  componentDidMount () {

    this.setState({ shots: [] });

    this.canvas = this.refs.viewbox.getDOMNode();
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = window.innerWidth;
    this.canvas.height = 600;

    this.ctx.fillStyle = '#268bd2';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    var waterLevel = this.canvas.height / 2 + 50;
    this.ctx.fillStyle = '#073642';
    this.ctx.fillRect(0, waterLevel, this.canvas.width, this.canvas.height / 2);

    this.ctx.fillStyle = '#2aa198';
    this.ctx.fillRect(0, waterLevel, this.canvas.width, 5);

    this.props.players.forEach(p => {
      this.drawPlayer(p.x, waterLevel + 10, p.team === 'white', p.team);
    });

    Utils.dispatcher().register(function (msg) {
      if (msg.type !== 'wordTyped') { return ; }

      var shots = this.state.shots;
      console.log(msg);
      shots.push();
      this.setState({ shots: shots });

    }.bind(this));
  }

  render () {
    return (
      <canvas ref="viewbox"></canvas>
    );
  }

};
