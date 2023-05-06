class Segment{
    constructor(pA, pB){
        this.k = 0.1
        this.pA = pA
        this.pB = pB
        this.len = distance(
            this.pA.loc, this.pB.loc
        )
        this.oldLen = distance(
            this.pA.loc, this.pB.loc
        )
    }

    draw(ctx){
        ctx.beginPath()
        ctx.moveTo(this.pA.loc.x, this.pA.loc.y)
        ctx.lineTo(this.pB.loc.x, this.pB.loc.y)
        ctx.stroke()
    }
    update(){
        this.len = distance(
            this.pA.loc, this.pB.loc
        )
       this.power = -this.k*(this.len-this.oldLen) 
       this.powerX = Math.cos(Math.atan2(this.pA.loc.y-this.pB.loc.y, this.pA.loc.x-this.pB.loc.x))*this.power
       this.powerY = Math.sin(Math.atan2(this.pA.loc.y-this.pB.loc.y, this.pA.loc.x-this.pB.loc.x))*this.power


       if(!this.pA.fixed){
        //    this.pA.loc = add(this.pA.loc, {x:this.powerX,y: this.powerY})
        // this.pA.vx+=this.powerX
        this.pA.vx += this.powerX
        this.pA.vy+=this.powerY

       }
       if(!this.pB.fixed){
        //    this.pB.loc = add(this.pB.loc, {x:-this.powerX,y:- this.powerY})
        // this.pB.vx-=this.powerX
        this.pB.vx -= this.powerX
        this.pB.vy-=this.powerY
       } 

    }
}