export default class Bird {
  constructor() {
    this.x = 100;
    this.y = 0;
    this.speed = -10;
    this.rect = { x: this.x, y: this.y, width: 40, height: 25 };
  }
  update(deltatime) {
    if (!deltatime) return;
    if (this.speed > -60) this.speed -= 4;
    this.rect.x = this.x;
    this.rect.y = this.y;
    this.y -= this.speed / deltatime;
  }
  draw(ctx) {
    let image = document.getElementById("bird");
    ctx.drawImage(image, this.x, this.y, 51, 36);
  }
}
