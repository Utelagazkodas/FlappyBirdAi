import { entity } from "../misc/classes";
import { bird } from "./bird";
import { pipe } from "./pipe";


export let entities : entity[] = []
export let birds : bird[] = []
export let pipes : pipe[] = []

export function draw (context: CanvasRenderingContext2D, frameCount: number, canvas : HTMLCanvasElement){
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    console.log(frameCount)

    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);

    entities.forEach((curEntity)=>{
        curEntity.draw(context)
        curEntity.update()
    })

    context.restore();
};



