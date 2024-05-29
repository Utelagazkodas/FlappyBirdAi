import { entity, vector2 } from "./classes";

export function getCollision(a : entity, b: entity) : boolean{

    if(a.shape == b.shape){
        if(a.shape == "circle"){
            return cirCirCollision(a, b)
        }
        if(a.shape == "rectangle"){
            return recRecCollision(a, b)
        }
    }
    else{
        if(a.shape == "rectangle" && b.shape == "circle"){
            return recCirCollision(a, b)
        }
        if (a.shape == "circle" && b.shape == "rectangle"){
            return recCirCollision(b,a)
        }
    }

    throw Error("Entity error (probably shape error)")

}

function recRecCollision (a : entity, b: entity) : boolean {
    if(){

    }
    return false
}

function cirCirCollision (a: entity, b:entity) : boolean {
    if(vector2.distance(a.position, b.position) <  a.size.x + b.size.x){
        return true
    }
    return false
}

function recCirCollision (rectangle : entity, circle : entity) : boolean {
    if(){
        return true
    }
    return false
}



function getRecSideDistance (rectange : entity, line : vector2) : number {
    
}