import { entity, vector2 } from "../misc/classes";


export class bird extends entity{
    velocity : vector2
    player? : boolean


    constructor(player? : boolean){
        super(vector2.zero, new vector2(50,50), "circle", "green")
        this.velocity = new vector2(0,0)  

        this.bird = this
        this.player = player
    }

    update(){
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.velocity.y += 10 * (1/60)
    }

    jump(){
        this.velocity.y = -5 
    }
}