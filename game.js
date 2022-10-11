// game loop

import{ update as update_Player1, draw as draw_Player1, PLAYER1_BASE_SPEED } from './player1.js'

let lastRenderTime = 0
const gameBoard = document.getElementById('game-board')
//const PLAYER1_BASE_SPEED = 2 // game speed???

function main(currentTime){
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / PLAYER1_BASE_SPEED) return
    
    
    // console.log(' Test for Render')
    lastRenderTime = currentTime

    update()
    draw()
}


window.requestAnimationFrame(main)

function update(){
    update_Player1()

}

function draw(){
    gameBoard.innerHTML=''
    draw_Player1(gameBoard)

}