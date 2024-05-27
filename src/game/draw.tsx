import { entity } from "../misc/classes";
import { bird } from "./bird";


export let entities : entity[] = []
export let birds : bird[] = []

export function draw (context: CanvasRenderingContext2D, frameCount: number, canvas : HTMLCanvasElement){
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    

    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);

    entities.forEach((curEntity)=>{
        curEntity.draw(context)
    })

    context.restore();
};



