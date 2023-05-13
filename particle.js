class Particle{
    constructor(loc, fixed=false, mouse){
        this.loc = loc
        this.oldLoc = loc
        this.fixed = fixed
        this.mouse = mouse
    }
    update(){
        if(!this.fixed){
            // W.x = lerp(-0.01, 0.01, Math.random())
            const vel = subtract(this.loc, this.oldLoc)
            const newLoc = add(add( add(this.loc , vel),G), W)
            this.oldLoc = this.loc
            this.loc = newLoc
            
            

        }
    }

    draw(ctx){
        const size = 4
        ctx.fillRect(this.loc.x-size/2, this.loc.y-size/2, size, size)
    }
}