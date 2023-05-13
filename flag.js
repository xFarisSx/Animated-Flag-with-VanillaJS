class Flag {
  constructor({ left = 250, top = 200, width = 31, height = 15, sep = 12 }) {
    this.particles = [];
    this.segments = [];
    this.polygons = [];
    this.chains = [];
    this.sep = sep;
    this.width = width;
    this.height = height;
    this.left = left;
    this.top = top;
    this.selectedParticle = null
    this.mouse = {
      x: 0,
      y: 0,
    };
    this.pressed = false;
    this.#generateFlag({ left, top, width, height, sep });
    addEventListener(
      "mousedown",
      function (e) {
        this.pressed = true;
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
        this.selectedParticle = this.getNearestParticle(this.mouse)
        if(distance(this.selectedParticle.loc, this.mouse) >this.sep || this.selectedParticle == this.chains[this.height-1].particles[0]){
          this.selectedParticle = null
        }else{
          this.selectedParticle.fixed = true

        }
        
      }.bind(this)
    );
    addEventListener(
      "mouseup",
      function (e) {
        this.pressed = false;
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      }.bind(this)
    );
    addEventListener(
      "mousemove",
      function (e) {
        if (this.pressed) {
          this.mouse.x = e.clientX;
          this.mouse.y = e.clientY;
          if(this.selectedParticle){
            this.selectedParticle.loc.x = e.clientX
            this.selectedParticle.loc.y = e.clientY

          }

          
        }
      }.bind(this)
    );
  }

  getNearestParticle(mouse){
    let nearest = this.particles[0]
    for(let p of this.particles){
      const dist = Math.abs(distance(p.loc, this.mouse))
      const dist2 =  Math.abs(distance(nearest.loc, this.mouse))
      console.log(dist2)
      if (dist <dist2){
        nearest = p
        console.log(dist)
      }
    }
    return nearest
  }

  #generateChain({ left, top, width, sep }, fixedFirst = false) {
    const particles = [];
    const segments = [];
    for (let i = 0; i < width; i++) {
      const fixed = i == 0 && fixedFirst;
      const x = left + i * sep;
      const y = top;
      particles.push(new Particle({ x, y }, fixed, this.mouse));
    }
    for (let i = 0; i < width; i++) {
      if (i < width - 1) {
        segments.push(new Segment(particles[i], particles[i + 1]));
      }
    }
    return { particles, segments };
  }

  #generateFlag({ left, top, width, height, sep }) {
    const chains = [];
    for (let i = 0; i < height; i++) {
      const y = top + i * sep;
      const fixedFirst = i == 0 || i == height - 1;
      chains.push(
        this.#generateChain(
          {
            left,
            top: y,
            width,
            sep,
          },
          fixedFirst
        )
      );
    }
    for (const { particles, segments } of chains) {
      this.particles = this.particles.concat(particles);
      this.segments = this.segments.concat(segments);
    }
    const firstChainParticles = chains[0].particles;
    for (let i = 0; i < firstChainParticles.length; i++) {
      for (let j = 1; j < chains.length; j++) {
        this.segments.push(
          new Segment(chains[j - 1].particles[i], chains[j].particles[i])
        );
      }
    }
    this.chains = chains;
    this.#generatePolygons({ left, top, width, height, sep });
  }

  #generatePolygons({ left, top, width, height, sep }) {
    const alpha = 0.9;
    const polygons = [];
    const firstChainParticles = this.chains[0].particles;
    for (let i = 0; i < height; i++) {
      polygons.push([]);
    }
    for (let i = 0; i < firstChainParticles.length - 1; i++) {
      for (let j = 0; j < this.chains.length - 1; j++) {
        // const color = `rgba(${random(128, 255)}, 0, 0)`
        const color =
          i < this.chains[j].particles.length / 3
            ? `rgba(255,0,0, ${alpha})`
            : i < (2 * this.chains[j].particles.length) / 3
            ? `rgba(255,255, 0, ${alpha})`
            : `rgba(255, 0, 0, ${alpha})`;
        polygons[j].push(
          new Polygon(
            this.chains[j].particles[i],
            this.chains[j].particles[i + 1],
            this.chains[j + 1].particles[i + 1],
            this.chains[j + 1].particles[i],
            color
          )
        );
      }
    }
    this.polygons = polygons;
  }

  update() {
    this.chains[this.height-1].particles[0].loc.x = this.particles[0].loc.x
    this.particles[0].loc.x = this.chains[this.height-1].particles[0].loc.x
    this.chains[this.height-1].particles[0].loc.y = this.particles[0].loc.y+this.height*this.sep

    for (let particle of this.particles) {
      particle.update();
    }
    for (let segment of this.segments) {
      segment.update();
    }
    for (let polygonJ of this.polygons) {
      for (let polygon of polygonJ) {
        polygon.update();
      }
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(
      this.chains[0].particles[0].loc.x,
      this.chains[0].particles[0].loc.y
    );
    ctx.lineTo(
      this.chains[this.height-1].particles[0].loc.x,
      this.chains[this.height-1].particles[0].loc.y+100
    );
    ctx.closePath();
    ctx.stroke();
    // for (let particle of this.particles) {
    //   particle.draw(ctx);
    // }
    // for (let segment of this.segments) {
    //   segment.draw(ctx);
    // }
    for (let polygonJ of this.polygons) {
      for (let polygon of polygonJ) {
        polygon.draw(ctx);
        const diag1 = distance(polygon.p1.loc, polygon.p3.loc);
        const diag2 = distance(polygon.p2.loc, polygon.p4.loc);
        const minDiag = Math.min(diag1, diag2);
        const maxDiag = Math.max(diag1, diag2);
        const ratio = minDiag / maxDiag;
        const alpha = lerp(0.3, 0, ratio);
        ctx.fillStyle = `rgba(0,0,0,${alpha})`;
        ctx.fill();
      }
    }
  }
}
