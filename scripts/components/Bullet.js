module.exports = class Bullet {

  animate (delay, cb) {

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

  constructor () {
    this.timer = null;
  }

};
