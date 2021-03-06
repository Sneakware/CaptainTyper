'use strict';

export default class Player {

  draw () {
    this.game.ctx.save();

    if (this.life === 0 && this.y < this.game.canvas.height) {
      this.y++;
    }

    var ally = this.game.teams.indexOf(this.team) === 0;
    if (!ally) {
      this.game.ctx.translate(this.x + this.x, this.y - 360);
      this.game.ctx.scale(1, -1);
      this.game.ctx.rotate(Math.PI);
    }

    var gradient = this.game.ctx.createLinearGradient(this.x - 110, this.y, this.x + 5, this.y);
    var calc = (this.life / this.maxLife) * 100;
    gradient.addColorStop(calc / 100, this.team.color);
    gradient.addColorStop(calc / 100, 'rgb(60, 60, 60)');

    this.game.ctx.fillStyle = gradient;
    this.game.ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    this.game.ctx.lineWidth = 2;

    this.game.ctx.beginPath();

    this.game.ctx.moveTo(this.x, this.y);
    // bottom
    this.game.ctx.lineTo(this.x + 3, this.y - 5);
    // top
    this.game.ctx.lineTo(this.x + 5, this.y - 20);
    this.game.ctx.lineTo(this.x - 15, this.y - 20);
    // bridge
    this.game.ctx.lineTo(this.x - 20, this.y - 15);
    this.game.ctx.lineTo(this.x - 50, this.y - 15);
    // tower
    this.game.ctx.lineTo(this.x - 50, this.y - 20);
    // cannon
    this.game.ctx.lineTo(this.x - 20, this.y - 30);
    this.game.ctx.lineTo(this.x - 20, this.y - 32);
    this.game.ctx.lineTo(this.x - 20, this.y - 32);
    // tower
    this.game.ctx.lineTo(this.x - 50, this.y - 25);
    this.game.ctx.lineTo(this.x - 47, this.y - 35);
    this.game.ctx.lineTo(this.x - 80, this.y - 35);
    this.game.ctx.lineTo(this.x - 80, this.y - 30);
    this.game.ctx.lineTo(this.x - 77, this.y - 20);
    this.game.ctx.lineTo(this.x - 80, this.y - 15);
    // lower bridge
    this.game.ctx.lineTo(this.x - 90, this.y - 15);
    this.game.ctx.lineTo(this.x - 100, this.y - 18);
    this.game.ctx.lineTo(this.x - 120, this.y - 18);
    this.game.ctx.lineTo(this.x - 118, this.y - 2);
    this.game.ctx.lineTo(this.x - 115, this.y);

    this.game.ctx.closePath();
    this.game.ctx.fill();
    this.game.ctx.stroke();

    this.game.ctx.restore();

    if (this.life > 0) {
      var text = this.name + ' - ' + this.life;
      var xCenter = this.x + (ally ? - 55 : 55);

      this.game.ctx.fillStyle = 'white';
      this.game.ctx.fillText(text, xCenter - this.game.ctx.measureText(text).width / 2, this.y - 60);

      if (this.team !== this.game.currentPlayer.team &&
          this.game.currentPlayer.target === this.game.teams[1].players.indexOf(this)) {
        this.game.ctx.beginPath();
        this.game.ctx.moveTo(xCenter - 5, this.y - 85);
        this.game.ctx.lineTo(xCenter + 5, this.y - 85);
        this.game.ctx.lineTo(xCenter, this.y - 75);
        this.game.ctx.fill();
      }
    }
  }

  takeDamage (damage) {
    if (this.life === 0) { return ; }
    this.life = (this.life - damage > 0) ? this.life - damage: 0;
    if (this.life === 0) {

      var aliveTeamMates = this.team.players.filter(player => { return player.life > 0; });

      if (aliveTeamMates.length === 0) {
        this.game.end(this.game.currentPlayer.team === this.team);
        return ;
      }

      var ennemyTeam = this.game.teams[this.game.teams.indexOf(this.team) === 1 ? 0 : 1];

      ennemyTeam.players.forEach(player => {
        if (player.target === this.team.players.indexOf(this)) {
          player.target = this.team.players.indexOf(aliveTeamMates[0]);
        }
      });
    }
  }

  keyPress (e) {

    if (this !== this.game.currentPlayer) { return ; }

    var switchTarget =  () => {
      var ennemyTeam = this.game.teams[this.game.teams.indexOf(this.team) === 1 ? 0 : 1];
      this.target = (this.game.teams[1].players.length - 1 <= this.target ? 0 : this.target + 1);
      if (ennemyTeam.players[this.target].life <= 0) {
        switchTarget();
      }
    };

    if (e.keyCode === 13) {
      switchTarget();
    }
  }

  constructor (name, x, team, game) {
    this.game = game;

    this.life = 100;
    this.maxLife = 100;

    this.x = x;
    this.y = this.game.waterLevel + 10;
    this.name = name;
    this.team = team;

    team.players.push(this);
    this.target = 0;

    window.addEventListener('keypress', this.keyPress.bind(this), false);
  }

}
