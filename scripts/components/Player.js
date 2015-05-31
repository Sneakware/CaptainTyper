module.exports = class Player {

  draw () {
    this.game.ctxBackCanvas.save();

    if (this.game.teams.indexOf(this.team) !== 0) {
      this.game.ctxBackCanvas.translate(this.x + this.x, this.y - 360);
      this.game.ctxBackCanvas.scale(1, -1);
      this.game.ctxBackCanvas.rotate(Math.PI);
    }

    this.game.ctxBackCanvas.fillStyle = this.team.color;
    this.game.ctxBackCanvas.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    this.game.ctxBackCanvas.lineWidth = 2;

    this.game.ctxBackCanvas.beginPath();

    this.game.ctxBackCanvas.moveTo(this.x, this.y);

    // bottom
    this.game.ctxBackCanvas.lineTo(this.x + 100, this.y);
    this.game.ctxBackCanvas.lineTo(this.x + 103, this.y - 5);
    // top
    this.game.ctxBackCanvas.lineTo(this.x + 105, this.y - 20);
    this.game.ctxBackCanvas.lineTo(this.x + 85, this.y - 20);
    // bridge
    this.game.ctxBackCanvas.lineTo(this.x + 80, this.y - 15);
    this.game.ctxBackCanvas.lineTo(this.x + 50, this.y - 15);
    // tower
    this.game.ctxBackCanvas.lineTo(this.x + 50, this.y - 20);
    // cannon
    this.game.ctxBackCanvas.lineTo(this.x + 80, this.y - 30);
    this.game.ctxBackCanvas.lineTo(this.x + 80, this.y - 32);
    this.game.ctxBackCanvas.lineTo(this.x + 80, this.y - 32);
    // tower
    this.game.ctxBackCanvas.lineTo(this.x + 50, this.y - 25);
    this.game.ctxBackCanvas.lineTo(this.x + 53, this.y - 35);
    this.game.ctxBackCanvas.lineTo(this.x + 20, this.y - 35);
    this.game.ctxBackCanvas.lineTo(this.x + 20, this.y - 30);
    this.game.ctxBackCanvas.lineTo(this.x + 23, this.y - 20);
    this.game.ctxBackCanvas.lineTo(this.x + 20, this.y - 15);
    // lower bridge
    this.game.ctxBackCanvas.lineTo(this.x + 10, this.y - 15);
    this.game.ctxBackCanvas.lineTo(this.x, this.y - 18);
    this.game.ctxBackCanvas.lineTo(this.x - 20, this.y - 18);
    this.game.ctxBackCanvas.lineTo(this.x - 18, this.y - 2);
    this.game.ctxBackCanvas.lineTo(this.x - 15, this.y);

    this.game.ctxBackCanvas.closePath();
    this.game.ctxBackCanvas.fill();
    this.game.ctxBackCanvas.stroke();

    this.game.ctxBackCanvas.restore();
  }

  constructor (name, x, team, game) {
    this.game = game;

    this.life = 100;
    this.x = x;
    this.y = this.game.waterLevel + 10;
    this.name = name;
    this.team = team;

    this.draw();
  }

};
