export class Platform {
  constructor({ c, x, y, image, action }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = 100 || image.width;
    this.height = 100 || image.height;
    this.action = action || "";
    this.c = c;
  }
  draw() {
    this.c.drawImage(this.image, this.position.x, this.position.y);
  }
}
