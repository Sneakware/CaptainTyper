var React = require('react');
var Utils = require('../Utils');

var Player = require('./Player');

module.exports = class Game extends React.Component {
  
  initLevel () {
    this.ctx.fillStyle = '#268bd2';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = '#073642';
    this.ctx.fillRect(0, this.waterLevel, this.canvas.width, this.canvas.height / 2);

    this.ctx.fillStyle = '#2aa198';
    this.ctx.fillRect(0, this.waterLevel, this.canvas.width, 5);
  }

  componentDidMount () {

    this.canvas = this.refs.viewbox.getDOMNode();
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = window.innerWidth;
    this.canvas.height = 600;
    
    this.waterLevel = this.canvas.height / 2 + 50;
    
    this.initLevel();

    this.teams = [{ id: 1, color: 'white' }, { id: 2, color: 'red' }];
    this.players = [new Player('player one', 100, this.teams[0], this), new Player('player two', 1500, this.teams[1], this)];

    Utils.dispatcher().register(function (msg) {
      if (msg.type !== 'wordTyped') { return ; }
      console.log(msg);
    }.bind(this));
  }

  render () {
    return (
      <canvas ref="viewbox"></canvas>
    );
  }

};
