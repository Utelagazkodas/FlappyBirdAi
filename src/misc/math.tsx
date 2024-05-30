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
        console.log("asd")

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
        return true
    }
    return false
}



function getRecSideDistance(rectangle: entity, line: vector2): number {
    // tries it with the left (/right) side
    const halfWidth = rectangle.size.x / 2

    if(line.x == 0){
        return halfWidth
    }

    let t : vector2 = line.abs()
    t = new vector2(1 * halfWidth, (t.y / t.x ) * halfWidth)

    if(t.magnitude() > vector2.distance(vector2.zero, rectangle.size.divide(2))) {
        
        return getRecSideDistance(new entity(rectangle.position, new vector2(rectangle.size.y, rectangle.size.x), rectangle.shape, rectangle.color), new vector2(line.y, line.x))
    }

    return t.magnitude()
}