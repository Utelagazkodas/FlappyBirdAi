import {  WINDOWHEIGHT } from "../App";
import { entity, vector2 } from "../misc/classes";
import { getCollision } from "../misc/math";
import { birds, pipes } from "./draw";
import { createPipes } from "./pipe";

export let playing: boolean = false
const gravity: number = 8

export function restart() : void {
    if(birds[0]){

        console.log("royale giant")

        createPipes(10, true)

        birds[0] = new bird(true)

        playing = true
    }
}


export class bird extends entity {
    velocity: vector2
    player?: boolean

    
    alive : boolean = true

    constructor(player?: boolean) {
        super(vector2.zero, new vector2(20, 20), "circle", "yellow", true)
        this.velocity = new vector2(0, 0)

        this.bird = this
        this.player = player

    }

    update() {
        if ((!this.player && this.alive) || (this.player && playing)) {
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y

            this.velocity.y += gravity * (1 / 60)

            if (this.isDead()) {
                this.alive = false

                if(this.player){
                    playing = false
                }

                this.position = new vector2(10000, 10000)
                
            }
        }
    }

    jump() {
        if (this.player && playing == false) {
            restart()
        
        }

        this.velocity.y = -3
    }

    isDead(): boolean {
        // out of screen
        if (this.size.x + this.position.y > WINDOWHEIGHT / 2 || this.position.y - this.size.x < -1 * WINDOWHEIGHT / 2) {
            return true
        }

        for (let index = 0; index < pipes.length; index++) {
            const element = pipes[index];

            if(!element){
                continue
            }

            if (getCollision(element.top, this)) {
                return true
            }
            
            if (getCollision(element.bottom, this)) {
                return true
            }

        }

        return false
    }
}