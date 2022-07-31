export class GenericObject {
  constructor({ c, x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.c = c;
    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    this.c.drawImage(this.image, this.position.x, this.position.y);
  }
}
