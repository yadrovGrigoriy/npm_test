export function randomNum (min, max){
    let rand = min + Math.random() * (max + 1 - min)
    return Math.floor(rand)
}

export function roundFloat(num){
    return parseFloat(num.toFixed(1))
}
