var React = require('react');

var Utils = require('../Utils');
var Player = require('./Player');
var Bullet = require('./Bullet');

module.exports = class Game extends React.Component {
  
  initLevel () {
    this.ctxBackCanvas.fillStyle = '#268bd2';
    this.ctxBackCanvas.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctxBackCanvas.fillStyle = '#073642';
    this.ctxBackCanvas.fillRect(0, this.waterLevel, this.canvas.width, this.canvas.height / 2);

    this.ctxBackCanvas.fillStyle = '#2aa198';
    this.ctxBackCanvas.fillRect(0, this.waterLevel, this.canvas.width, 5);
  }
  
  animate () {
    requestAnimationFrame(() => { this.animate(); });
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bullets.forEach(bullet => {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(bullet.x, bullet.y, 5, 5);
    });
  }

  componentDidMount () {

    this.backCanvas = this.refs.background.getDOMNode();
    this.ctxBackCanvas = this.backCanvas.getContext('2d');

    this.canvas = this.refs.viewbox.getDOMNode();
    this.ctx = this.canvas.getContext('2d');

    this.backCanvas.width = window.innerWidth;
    this.backCanvas.height = 600;
    this.canvas.width = window.innerWidth;
    this.canvas.height = 600;
    
    this.waterLevel = this.canvas.height / 2 + 50;
    
    this.initLevel();

    this.teams = [{ id: 1, color: 'white' }, { id: 2, color: 'red' }];
    this.currentPlayer = new Player('player one', 100, this.teams[0], this);
    this.players = [this.currentPlayer, new Player('player two', 1500, this.teams[1], this)];

    this.bullets = [];

    Utils.dispatcher().register((msg) => {
      if (msg.type === 'wordTyped') {
        this.bullets.push(new Bullet(this.currentPlayer, this.players[msg.target], msg.damage, this));
      }
    });
    
    this.animate();
  }

  render () {
    return (
      <div className="game-container">
        <canvas ref="background"></canvas>
        <canvas ref="viewbox"></canvas>
      </div>
    );
  }

};
