module.exports = class Bullet {

  animate (duration, cb, delay) {

    if (!delay) { delay = 1 / 40; }

    clearInterval(this.timer);
    var startTime = new Date;
    this.timer = setInterval(() => {
      var now = new Date;
      var elapsed = (now - startTime) / 1000;
      var percent = elapsed / duration;
      if (percent >= 1) {
        percent = 1;
        clearInterval(this.timer);
      }
      var p1 = this.pointAt(percent - 0.01);
      var p2 = this.pointAt(percent + 0.01);
      cb(this.pointAt(percent), Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI);
    }, delay * 1000);
  }

  pointAt (percent) {
    return this.path.getPointAtLength(this.pathLength * percent);
  }

  createPath () {
    this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    this.path.setAttribute('d', 'M' + this.sender.x.toString() + ',' + this.sender.y.toString() + 'C' +
    this.sender.x.toString() + ',' + (this.sender.y - 200).toString() + ' ' +
    this.receiver.x.toString() + ',' + (this.receiver.y - 200).toString() + ' ' +
    this.receiver.x.toString() + ',' + this.receiver.y.toString());

    this.pathLength = this.path.getTotalLength();
  }

  constructor (player, target, damage) {

    this.timer = null;
    this.damage = damage;
    this.sender = player;
    this.receiver = target;

    this.x = this.sender.x;
    this.y = this.sender.y;
    this.o = 0;

    this.createPath();
    this.animate(5, (point, angle) => {
      this.x = point.x;
      this.y = point.y;
      this.o = angle;
    });
  }

};
