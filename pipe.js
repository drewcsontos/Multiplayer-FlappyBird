/* eslint-disable no-unused-vars */
class Pipe {
  constructor(x) {
    this.ctx = null;
    this.x = x;
    this.random = Math.random() * 175 - 75;
    this.rect1 = { x: this.x, y: -200 + this.random, width: 100, height: 400 };
    this.rect2 = { x: this.x, y: this.random + 375, width: 100, height: 400 };
    this.scored = false;
    this.draw = function (ctx) {
      let bottom = document.getElementById("pipe");
      let top = document.getElementById("pipe1");
      ctx.fillStyle = "green";
      ctx.drawImage(top, this.x, -200 + this.random, 100, 400);
      ctx.drawImage(bottom, this.x, this.random + 375, 100, 400);
    };
  }
  update() {
    this.rect1.x = this.x;
    this.rect2.x = this.x;
    this.rect1.y = -200 + this.random;
    this.rect2.y = this.random + 375;
    this.x -= 3;
    if (this.x < -200) {
      this.x = 600;
      this.random = Math.random() * 175 - 75;
      this.scored = false;
    }
  }
  draw(ctx) {
    let bottom = document.getElementById("pipe");
    let top = document.getElementById("pipe1");
    ctx.fillStyle = "green";

    ctx.drawImage(top, this.x, -200 + this.random, 100, 400);
    ctx.drawImage(bottom, this.x, this.random + 375, 100, 400);
  }
}
module.exports = Pipe;
