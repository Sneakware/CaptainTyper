module.exports = class Player {

  draw () {
    this.game.ctx.save();

    if (this.game.teams.indexOf(this.team) !== 0) {
      this.game.ctx.translate(this.x + this.x, this.y - 360);
      this.game.ctx.scale(1, -1);
      this.game.ctx.rotate(Math.PI);
    }

    this.game.ctx.fillStyle = this.team.color;
    this.game.ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    this.game.ctx.lineWidth = 2;

    this.game.ctx.beginPath();

    this.game.ctx.moveTo(this.x, this.y);

    // bottom
    this.game.ctx.lineTo(this.x + 100, this.y);
    this.game.ctx.lineTo(this.x + 103, this.y - 5);
    // top
    this.game.ctx.lineTo(this.x + 105, this.y - 20);
    this.game.ctx.lineTo(this.x + 85, this.y - 20);
    // bridge
    this.game.ctx.lineTo(this.x + 80, this.y - 15);
    this.game.ctx.lineTo(this.x + 50, this.y - 15);
    // tower
    this.game.ctx.lineTo(this.x + 50, this.y - 20);
    // cannon
    this.game.ctx.lineTo(this.x + 80, this.y - 30);
    this.game.ctx.lineTo(this.x + 80, this.y - 32);
    this.game.ctx.lineTo(this.x + 80, this.y - 32);
    // tower
    this.game.ctx.lineTo(this.x + 50, this.y - 25);
    this.game.ctx.lineTo(this.x + 53, this.y - 35);
    this.game.ctx.lineTo(this.x + 20, this.y - 35);
    this.game.ctx.lineTo(this.x + 20, this.y - 30);
    this.game.ctx.lineTo(this.x + 23, this.y - 20);
    this.game.ctx.lineTo(this.x + 20, this.y - 15);
    // lower bridge
    this.game.ctx.lineTo(this.x + 10, this.y - 15);
    this.game.ctx.lineTo(this.x, this.y - 18);
    this.game.ctx.lineTo(this.x - 20, this.y - 18);
    this.game.ctx.lineTo(this.x - 18, this.y - 2);
    this.game.ctx.lineTo(this.x - 15, this.y);

    this.game.ctx.closePath();
    this.game.ctx.fill();
    this.game.ctx.stroke();

    this.game.ctx.restore();
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
