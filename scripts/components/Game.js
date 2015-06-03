var React = require('react');

var Utils = require('../Utils');
var Ui = require('./Ui');
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
  
  draw () {
    if (this.gameEnded) { return ; }
    requestAnimationFrame(() => { this.draw(); });
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.bullets.forEach(bullet => {
      if (!bullet.active) { return ; }
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(bullet.x, bullet.y, 5, 5);
    });

    this.players.forEach(player => {
      player.draw();
    });
  }

  end (loose) {
    this.gameEnded = true;
    this.ctx.font = '40px monospace';
    var text = loose ? 'You loose, lol.' : 'Yeah, you win!';
    this.ctx.fillText(text, this.canvas.width / 2 - this.ctx.measureText(text).width / 2, this.canvas.height / 2);
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

    this.gameEnded = false;
    this.waterLevel = this.canvas.height / 2 + 50;
    
    this.initLevel();

    this.teams = [{ id: 1, color: 'white', players: [] }, { id: 2, color: 'red', players: [] }];

    this.currentPlayer = new Player('player one', 200, this.teams[0], this);
    this.players = [
      this.currentPlayer,
      new Player('player two', this.canvas.width - 200, this.teams[1], this),
      new Player('player three', this.canvas.width - 350, this.teams[1], this),
      new Player('player four', this.canvas.width - 500, this.teams[1], this)
    ];

    this.bullets = [];

    Utils.dispatcher().register((msg) => {
      if (msg.type === 'wordTyped') {
        this.bullets.push(new Bullet(this.currentPlayer, this.teams[1].players[this.currentPlayer.target], msg.damage, this));
      }
    });
    
    this.draw();
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
