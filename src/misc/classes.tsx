import { bird } from "../game/bird"
import { entities } from "../game/draw"

export class vector2 {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y


    }

    static zero: vector2 = new vector2(0, 0)

    // get distance between two points
    static distance(a: vector2, b:vector2) : number {
        return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y))
    }

    normalized() : vector2 {
        // the reciprocal of the magnitude 
        let t = 1 / this.magnitude()
        return new vector2(this.x * t, this.y * t)
    }

    magnitude() : number {
        return Math.sqrt(this.x ^ 2 + this.y ^ 2)
    }

    abs() : vector2 {
        return new vector2(Math.abs(this.x), Math.abs(this.y))
    }

    multiply(num : number) : vector2 {
        return new vector2(this.x * num, this.y * num)
    }

    divide(num : number) : vector2 {
        return this.multiply(1 / num)
    }
}



export class entity {
    position: vector2
    size: vector2
    shape: string
    color: string
    bird? : bird

    constructor(position: vector2, size: vector2, shape: string, color: string, render? : boolean) {
        this.position = position
        this.size = size
        this.color = color

        if (shape == "circle" || shape == "rectangle") {
            this.shape = shape

            if(render){
                entities.push(this)
            }
            if(shape == "circle"){
                this.size.y = this.size.x
            }

            return
        }

        throw Error("incorrect shape")
    }

    draw(ctx: CanvasRenderingContext2D) {
        if(this.bird){
            this.bird.update()
        }

        if (this.shape == "circle") {
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, this.size.x, 0, 2 * Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        else if (this.shape == "rectangle") {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.position.x , this.position.y , this.size.x, this.size.y);
            
        }else {
            throw Error("shape error when trying to draw")
        }



    }

    update(){throw Error("updating non bird or pipe entity")}

    copy() : entity{
        return new entity(this.position, this.size, this.shape, this.color, false)
    }

    isAlive():boolean {throw Error()}

}