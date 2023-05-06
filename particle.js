class Particle{
    constructor(loc, fixed=false){
        this.loc = loc
        this.oldLoc = loc
        this.fixed = fixed
        this.vx = 0
        this.vy = 0
        this.ax = 0
        this.ay = G.y
        this.m = 1
        this.airKs = 0.001
        this.face = 1
    }

    airFriction(){
        let fy = Math.abs(this.ay) * this.m;
        let fsy = this.face * this.airKs * (this.vy * this.vy);
    
        if (this.ay > 0) {
          this.ay = (fy - fsy) / this.m;
        } else {
          this.ay = -1 * ((fy - fsy) / this.m);
        }
    
        let fx = Math.abs(this.ax) * this.m;
        let fsx = this.face * this.airKs * (this.vx * this.vx);
        if (this.ax > 0) {
          this.ax = (fx - fsx) / this.m;
        } else {
          this.ax = -1 * ((fx - fsx) / this.m);
        }
    }
    update(){
        if(!this.fixed){
            // const vel = subtract(this.loc, this.oldLoc)
            // const newLoc = add( add(this.loc , vel),G)
            // this.oldLoc = this.loc
            // this.loc = newLoc
            this.loc.y+=this.vy
            this.loc.x+=this.vx
            this.vx+=this.ax 
            this.vy+=this.ay 
            this.airFriction()

        }
        // if(this.ax)
    }

    draw(ctx){
        const size = 4
        ctx.fillRect(this.loc.x-size/2, this.loc.y-size/2, size, size)
    }
}