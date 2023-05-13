class Polygon {
  constructor(p1, p2, p3, p4, color) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.p4 = p4;
    this.color = color;
  }
  update() {}
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.moveTo(this.p1.loc.x, this.p1.loc.y);
    ctx.lineTo(this.p2.loc.x, this.p2.loc.y);
    ctx.lineTo(this.p3.loc.x, this.p3.loc.y);
    ctx.lineTo(this.p4.loc.x, this.p4.loc.y);
    ctx.closePath();
    ctx.fill();
    
  }
}
