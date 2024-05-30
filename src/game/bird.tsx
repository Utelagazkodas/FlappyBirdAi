import { entity, vector2 } from "../misc/classes";
import { getCollision } from "../misc/math";
import { entities } from "./draw";


export class bird extends entity{
    velocity : vector2
    player? : boolean

    gravity : number = 10


    constructor(player? : boolean){
        super(vector2.zero, new vector2(20,20), "circle", "green", true)
        this.velocity = new vector2(0,0)  

        this.bird = this
        this.player = player

    }

    update(){
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.velocity.y += this.gravity * (1/60)

        if(this.isDead()){
            this.update = () => {}
            this.position = new vector2(Infinity, Infinity)
        }
    }

    jump(){
        this.velocity.y = -5 
    }

    isDead(): boolean {
        // out of screen
        if(this.size.x + this.position.y > window.innerHeight / 2 || this.position.y - this.size.x  < -1 * window.innerHeight / 2){
            return true
        }

        entities.forEach(element => {
            
            if(!element.bird){
                console.log(element.position.y)

                if(getCollision(element, this)){
                    return true
                }
            }
        });

        return false
    }
}