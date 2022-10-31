import { getInputDirection } from "./input.js"


const pacboy = [{x:14 ,y:18}]

export function update(){
    const inputDirection = getInputDirection()
    // for (let i = pacboy.length-2; i >=0; i--){
    //     pacboy[i+1]={...pacboy[i]}
    // }
    pacboy[0].x += inputDirection.x
    pacboy[0].y += inputDirection.y
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