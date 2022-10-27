
import { createBoard } from "./map.js"
import { update as updatePacBOY, draw as drawPacBOy } from "./pacBoy.js"

let lastRenderTime = 0
const GAME_SPEED = 2
const gameBoard = document.getElementById('game-board')
 const test2 = document.getElementById('500')

function main(currentTime){
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1/ GAME_SPEED) return
    
    lastRenderTime = currentTime
    console.log('Render')


    update()
    draw()
}

window.requestAnimationFrame(main)

function update(){
    updatePacBOY()

}

function draw(){
    gameBoard.innerHTML =''
    createBoard(gameBoard)
    //gEmtpty.remove()
    drawPacBOy(gameBoard)

    //const test1 = gameBoard.getElementById("496")
    //test1.classList.add('wall')
    //test1.remove()

    test2.classList.add('wall')



}
