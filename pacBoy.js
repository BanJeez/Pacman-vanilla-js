import { getInputDirection } from "./input.js"


const pacboy = [{x:12 ,y:12}]

export function update(){
    const inputDirection = getInputDirection()
    for (let i = pacboy.length-2; i >=0; i--){
        pacboy[i+1]={...pacboy[i]}
    }
    pacboy[0].x += 1  //inputDirection
    pacboy[0].y += 0 //inputDirection
    console.log('up')
}

export function draw(gameBoard){
    pacboy.forEach(axies =>{
        const pacElement = document.createElement('div')
        pacElement.style.gridRowStart = axies.y
        pacElement.style.gridColumnStart = axies.x
        pacElement.classList.add('pacboy')
        gameBoard.appendChild(pacElement)
    })
    console.log('draw')
}