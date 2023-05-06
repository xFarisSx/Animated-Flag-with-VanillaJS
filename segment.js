class Segment {
  constructor(pA, pB) {
    this.k = 0.01;
    this.pA = pA;
    this.pB = pB;
    this.len = distance(this.pA.loc, this.pB.loc);
    this.oldLen = distance(this.pA.loc, this.pB.loc);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.pA.loc.x, this.pA.loc.y);
    ctx.lineTo(this.pB.loc.x, this.pB.loc.y);
    ctx.stroke();
  }
  update(dt) {
    this.len = distance(this.pA.loc, this.pB.loc);
    const diff = subtract(this.pA.loc, this.pB.loc);
    const delta = (this.len - this.oldLen)/16;
    const norm = normalize(diff);

    if (this.pA.fixed) {
        this.pB.loc = add(this.pB.loc, scale(norm, delta));
    }
    else if (this.pB.fixed) {
        this.pA.loc = add(this.pA.loc, scale(norm, -delta ));
    } else {
        this.pA.loc = add(this.pA.loc, scale(norm, -delta/2 ));
        this.pB.loc = add(this.pB.loc, scale(norm, delta/2));

    }
  }
}
