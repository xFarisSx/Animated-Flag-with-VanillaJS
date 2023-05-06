class Particle{
    constructor(loc, fixed=false){
        this.loc = loc
        this.oldLoc = loc
        this.fixed = fixed
        this.a = 100
    }
    update(dt){
        if(!this.fixed){
            if(this.a > 0.05){
                this.a = this.a/1.02
            }
           let G = {x:Math.sqrt(Math.abs(this.loc.x-innerWidth/2))/this.a, y:Math.sqrt(Math.abs((this.loc.y-innerHeight/2)))/this.a}
           if(!(this.loc.x-innerWidth/2<0)){
            G.x*=-1
           }
           if(!(this.loc.y-innerHeight/2<0)){
            G.y*=-1
           }
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