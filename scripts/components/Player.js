module.exports = class Player {

  draw () {
    this.game.ctxBoats.save();

    if (this.game.teams.indexOf(this.team) !== 0) {
      this.game.ctxBoats.translate(this.x + this.x, this.y - 360);
      this.game.ctxBoats.scale(1, -1);
      this.game.ctxBoats.rotate(Math.PI);
    }

    this.game.ctxBoats.fillStyle = this.team.color;
    this.game.ctxBoats.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    this.game.ctxBoats.lineWidth = 2;

    this.game.ctxBoats.beginPath();

    this.game.ctxBoats.moveTo(this.x, this.y);

    // bottom
    this.game.ctxBoats.lineTo(this.x + 100, this.y);
    this.game.ctxBoats.lineTo(this.x + 103, this.y - 5);
    // top
    this.game.ctxBoats.lineTo(this.x + 105, this.y - 20);
    this.game.ctxBoats.lineTo(this.x + 85, this.y - 20);
    // bridge
    this.game.ctxBoats.lineTo(this.x + 80, this.y - 15);
    this.game.ctxBoats.lineTo(this.x + 50, this.y - 15);
    // tower
    this.game.ctxBoats.lineTo(this.x + 50, this.y - 20);
    // cannon
    this.game.ctxBoats.lineTo(this.x + 80, this.y - 30);
    this.game.ctxBoats.lineTo(this.x + 80, this.y - 32);
    this.game.ctxBoats.lineTo(this.x + 80, this.y - 32);
    // tower
    this.game.ctxBoats.lineTo(this.x + 50, this.y - 25);
    this.game.ctxBoats.lineTo(this.x + 53, this.y - 35);
    this.game.ctxBoats.lineTo(this.x + 20, this.y - 35);
    this.game.ctxBoats.lineTo(this.x + 20, this.y - 30);
    this.game.ctxBoats.lineTo(this.x + 23, this.y - 20);
    this.game.ctxBoats.lineTo(this.x + 20, this.y - 15);
    // lower bridge
    this.game.ctxBoats.lineTo(this.x + 10, this.y - 15);
    this.game.ctxBoats.lineTo(this.x, this.y - 18);
    this.game.ctxBoats.lineTo(this.x - 20, this.y - 18);
    this.game.ctxBoats.lineTo(this.x - 18, this.y - 2);
    this.game.ctxBoats.lineTo(this.x - 15, this.y);

    this.game.ctxBoats.closePath();
    this.game.ctxBoats.fill();
    this.game.ctxBoats.stroke();

    this.game.ctxBoats.restore();
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
