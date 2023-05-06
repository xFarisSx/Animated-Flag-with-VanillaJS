class Flag {
  constructor({ left = 0, top = 0, width = 15, height = 8, sep = 30 }) {
    this.time = 0;
    this.fps = 1100;
    this.timeInterval = 1000 / this.fps;

    this.particles = [];
    this.segments = [];
    this.#generateFlag({ left, top, width, height, sep });
  }

  #generateVerticalChain({ left, top, width, sep }) {
    const particles = [];
    const segments = [];
    for (let i = 0; i < width; i++) {
      const fixed = i == 0 || i == width - 1;
      const x = left + i * sep;
      const y = top;
      particles.push(new Particle({ x, y }, fixed));
    }
    for (let i = 0; i < width; i++) {
      if (i < width - 1) {
        segments.push(new Segment(particles[i], particles[i + 1]));
      }
    }
    return { particles, segments };
  }

  #generateHorizontalChain({ width, height }) {
    for (let i = 0; i < height; i++) {
      for (let x = 0; x < width; x++) {
        let y = i * width;
        if (x + y < this.particles.length - width) {
          this.segments.push(
            new Segment(this.particles[y + x], this.particles[y + x + width])
          );
        }
      }
    }
  }

  #generateFlag({ left, top, width, height, sep }) {
    for (let i = 0; i < height; i++) {
      const y = top + i * sep;
      const { particles, segments } = this.#generateVerticalChain({
        left,
        top: y,
        width,
        sep,
      });
      if (i == 0 || i == height - 1) {
        console.log(i);
        particles.forEach((p) => (p.fixed = true));
      }
      this.particles = this.particles.concat(particles);
      this.segments = this.segments.concat(segments);
    }
    this.#generateHorizontalChain({ width, height });
  }

  update(dt) {
    if (this.time >= this.timeInterval) {
      for (let particle of this.particles) {
        particle.update(dt);
      }
      for (let segment of this.segments) {
        segment.update(dt);
      }
      this.time = 0;
    } else {
      this.time += dt;
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
