const gravity = 0.5;

export class Player {
  constructor({ c, canvas, image }) {
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.width = 90;
    this.height = 110;
    this.image = image;
    this.frames = 0;
    this.animating = false;
    this.c = c;
    this.canvas = canvas;
  }
  draw() {
    this.c.drawImage(
      this.image,
      341.5 * (this.animating ? this.frames : 1),
      0,
      341.5,
      400,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  update() {
    this.frames += 1;
    if (this.frames > 28) {
      this.frames = 0;
    }
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= this.canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}
