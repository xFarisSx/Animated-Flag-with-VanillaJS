function random(max, min){
    return Math.random()*(max-min)+min
}

function lerp(min, max, t) {
  return min + (max - min) * t;
}
function vLerp(A, B, t) {
    const res = {}
    for(let attr in A) {
        res[attr] = lerp(A[attr], B[attr], t)
    }
    return res
}

function add(v1, v2){
    return {
        x:v1.x+v2.x,
        y:v1.y+v2.y,

    }
}
function subtract(v1, v2){
    return {
        x:v1.x-v2.x,
        y:v1.y-v2.y,

    }
}
function scale(v, scaler){
    return {
        x:v.x*scaler,
        y:v.y*scaler,

    }
}

function magnitude(v){
    return Math.hypot(v.x, v.y)
}

function normalize(v){
    return scale(v, 1/magnitude(v))
}


function distance(v1, v2){
    return magnitude(subtract(v1, v2))
}