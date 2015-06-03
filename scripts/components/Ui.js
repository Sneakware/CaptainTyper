module.exports = class Ui {
  
  constructor (game) {
    this.game = game;
  }
  
  draw () {
    this.teamOneCpt = 0;
    this.teamTwoCpt = 0;
    this.game.players.forEach(player => {
      var text = player.name + ' - ' + player.life;
      this.game.ctx.fillStyle = 'white';
      if (player.team === this.game.teams[0]) {
        this.game.ctx.fillText(text, 30, this.game.waterLevel - 60 - this.teamOneCpt * 30);
        this.teamOneCpt++;
      } else {
        var x = this.game.canvas.width - this.game.ctx.measureText(text).width - 30;
        var y = this.game.waterLevel - 60 - this.teamTwoCpt * 30;
        if (this.game.currentPlayer.target === this.teamTwoCpt) {
          this.game.ctx.beginPath();
          this.game.ctx.moveTo(x - 20, y - 8);
          this.game.ctx.lineTo(x - 10, y - 3);
          this.game.ctx.lineTo(x - 20, y + 2);
          this.game.ctx.fill();
        }
        this.game.ctx.fillText(text, x, y);
        this.teamTwoCpt++;
      }
    });
  }
  
};
