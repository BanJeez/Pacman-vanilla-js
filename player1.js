import { getInputDirection } from "./input.js"

export const PLAYER1_BASE_SPEED = 2 // game speed???
const playerBody =[{x:11, y:11}]

export function update(){
    const inputDirection = getInputDirection()
    //console.log(' Test for update')
    playerBody[0].x += inputDirection.x
    playerBody[0].y += inputDirection.y


}

export function draw(gameBoard){
    // console.log(' Thest for draw')
    playerBody.forEach(segment =>{
        const playerElement = document.createElement('div')
        playerElement.style.gridRowStart = segment.y
        playerElement.style.gridColumnStart = segment.x
        playerElement.classList.add('player1')
        gameBoard.appendChild(playerElement)
    })

}