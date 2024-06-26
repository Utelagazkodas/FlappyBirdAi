import { WINDOWHEIGHT, WINDOWWIDTH, lastPipe, pipeDistance, setLastPipe } from "../App";
import { entity, vector2 } from "../misc/classes";
import { playing } from "./bird";
import { pipes, setPipes } from "./draw";

let pipeSpeed : number = 200
export let pipeThickness  : number= 75
let pipeGap : number = 150

export class pipe extends entity{
    top : entity
    bottom : entity

    constructor(height : number, offset : number){
        super(new vector2(WINDOWWIDTH / 2 + pipeThickness / 2 + offset, 0), vector2.zero, "circle", "blue", true)

        this.top = new entity(new vector2(WINDOWWIDTH / 2 + pipeThickness / 2  + offset, 0 - WINDOWHEIGHT / 2 - pipeGap / 2 - height / 2 ), new vector2(pipeThickness, WINDOWHEIGHT), "rectangle", "green", true)
        this.bottom = new entity(new vector2(WINDOWWIDTH / 2 + pipeThickness / 2  + offset, 0 + WINDOWHEIGHT / 2 + pipeGap / 2 - height / 2), new vector2(pipeThickness, WINDOWHEIGHT), "rectangle", "green", true)
        
    }

    update(){
        if(playing ){
            this.top.position.x -= pipeSpeed * (1/60)
            this.bottom.position.x -= pipeSpeed  * (1/60)
            this.position.x -= pipeSpeed  * (1/60)
        }

        if(!this.isAlive()){
            

            this.top.position.x = lastPipe.position.x + pipeDistance
            this.bottom.position.x = lastPipe.position.x + pipeDistance
            this.position.x = lastPipe.position.x + pipeDistance

            setLastPipe(this)
        }
    }

    isAlive(){
        if(this.position.x < 0 - WINDOWWIDTH/2 - pipeThickness / 2){
            
            return false
        }
        return true
    }
}

export function createPipes(n : number, reset? : boolean) : void {
    let pipeAmount: number = n

    if(reset){
        pipes.forEach((pipe) => {
            pipe.top.destroy()
            pipe.bottom.destroy()
        })
        setPipes([])
    }
  
    if(pipes.length == 0){
    for (let index = 0; index < pipeAmount; index++) {
      let t = new pipe((Math.random() - 0.5) * 400,  index * pipeDistance)
      pipes.push(t)
      setLastPipe(t)
    }
    }
}

