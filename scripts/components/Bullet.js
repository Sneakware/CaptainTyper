module.exports = class Bullet {

  animate (duration, cb, final) {

    var delay = 1 / 40;

    clearInterval(this.timer);
    var startTime = new Date;
    this.timer = setInterval(() => {
      var now = new Date;
      var elapsed = (now - startTime) / 1000;
      var percent = elapsed / duration;
      if (percent >= 1) {
        percent = 1;
        clearInterval(this.timer);
        final();
      }
      var p1 = this.pointAt(percent - 0.01);
      var p2 = this.pointAt(percent + 0.01);
      cb(this.pointAt(percent), Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI);
    }, delay * 1000);
  }

  pointAt (percent) {
    return this.path.getPointAtLength(this.pathLength * percent);
  }

  randomValue (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  createPath () {
    this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    this.path.setAttribute('d', 'M' + this.x.toString() + ',' + this.y.toString() + 'C' +
    (this.x + (this.ally ? 30 : - 30)).toString() + ',' + (this.y - (this.ally ? 50 : -50)).toString() + ' ' +
    this.randomValue(this.receiver.x + (this.ally ? - 100 : 100), this.receiver.x + 10).toString() + ',' +
    (this.receiver.y - this.randomValue(100, 200)).toString() + ' ' +
    this.randomValue(this.receiver.x, this.receiver.x + (this.ally ? 110 : - 110)).toString() + ',' +
    (this.receiver.y - 10).toString());

    this.pathLength = this.path.getTotalLength();
  }

  constructor (player, target, damage, game) {

    this.timer = null;
    this.damage = damage;
    this.sender = player;
    this.receiver = target;
    this.game = game;

    this.ally = (this.sender.team === this.game.currentPlayer.team);
    this.active = true;
    this.x = this.sender.x + (this.ally ? -20 : 20);
    this.y = this.sender.y - 35;
    this.o = 0;

    this.createPath();
    this.animate(5, (point, angle) => {
      this.x = point.x;
      this.y = point.y;
      this.o = angle;
    }, () => {
      this.receiver.takeDamage(this.damage);
      this.active = false;
    });
  }

};
