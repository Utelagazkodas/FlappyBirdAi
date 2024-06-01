import { entity, vector2 } from "./classes";

export function getCollision(a: entity, b: entity): boolean {

    if (a.shape == b.shape) {
        if (a.shape == "circle") {
            return cirCirCollision(a, b)
        }
        if (a.shape == "rectangle") {
            return recRecCollision(a, b)
        }
    }
    else {

        if (a.shape == "rectangle" && b.shape == "circle") {
            return recCirCollision(a, b)
        }
        if (a.shape == "circle" && b.shape == "rectangle") {
            return recCirCollision(b, a)
        }
    }

    throw Error("Entity error (probably shape error)")

}

function recRecCollision(a: entity, b: entity): boolean {
    if (a.position.x <= b.position.x + b.size.x &&
        a.position.x + a.size.x >= b.position.x &&
        a.position.y <= b.position.y + b.size.y &&
        a.position.y + a.size.y >= b.position.y) {
        return true

    }
    return false
}

function cirCirCollision(a: entity, b: entity): boolean {
    if (vector2.distance(a.position, b.position) <= a.size.x + b.size.x) {
        return true
    }
    return false
}

function recCirCollision(rectangle: entity, circle: entity): boolean {
    if (vector2.distance(rectangle.position, circle.position) <= circle.size.x + getRecSideDistance(rectangle, new vector2(rectangle.position.x - circle.position.x, rectangle.position.y - circle.position.y))) {
        console.log("touching")
        return true
    }
    return false
}



function getRecSideDistance(rectangle: entity, line: vector2): number {
    // tries it with the left (/right) side

    if(line.x == 0){
        return rectangle.size.x / 2
    } 
    if(line.y == 0){
        return rectangle.size.y / 2
    }

    // makes the vector have the right proportions
    let t : vector2 = new vector2(1,line.y / line.x).abs()

    // multiplies it by the rectangles width
    t = t.multiply(rectangle.size.x / 2)

    // if it should relate it to the top side
    if(t.y > rectangle.size.y / 2){
        t = new vector2(line.x / line.y,1).abs()

        // multiplies it by the rectangles width
        t = t.multiply(rectangle.size.y / 2)
    }


    return t.magnitude()
    
}