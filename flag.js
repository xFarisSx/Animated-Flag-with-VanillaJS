class Flag {
  constructor({ left = 300, top = 100, width = 30, height = 30, sep = 11 }) {
    this.particles = [];
    this.segments = [];

    for (let i = 0; i < width; i++) {
    const fixed = i==0 || i==width-1
      const x = left + i * sep;
      const y = top;
      this.particles.push(new Particle({ x, y }, fixed));
    }
    for (let i = 0; i < width; i++) {
      if(i<width-1){
        this.segments.push(new Segment(this.particles[i], this.particles[i+1]))
      }
    }
  }

  update() {
    for (let particle of this.particles) {
      particle.update();
    }
    for (let segment of this.segments) {
        segment.update();
      }
  }

  draw(ctx) {
    for (let particle of this.particles) {
      particle.draw(ctx);
    }
    for (let segment of this.segments) {
      segment.draw(ctx);
    }
  }
}
