import { LEVEL, OBJECT_TYPE } from './setup.js';
import { randomMovement } from './ghostmoves.js';
// Classes
import GameBoard from './GameBoard.js';
import Pacman from './Pacman.js';
import Ghost from './Ghost.js';

// Dom Elementsme
const livesTotal = document.querySelector('#lives')
const timeTotal = document.querySelector('#time')
const gameGrid = document.querySelector('#game');
const scoreTable = document.querySelector('#score');
const startButton = document.querySelector('#start-button');
const restartButton = document.querySelector('#restart-button');
const pauseButton = document.querySelector('#pause-button');
const unPauseButton = document.querySelector('#unpause-button');

// Game constants
const POWER_PILL_TIME = 10000; // ms
const GLOBAL_SPEED = 30; // ms
const gameBoard = GameBoard.createGameBoard(gameGrid, LEVEL);

// Initial setup
let time = 0
let lastRenderTime = 0
let score = 0;
let lives = 3
let timer = null;
let pauseGame = false
let gameWin = false;
let gameOverMain = false
let powerPillActive = false;
let powerPillTimer = null;

// --- GAME CONTROLLER --- //
function gameOver(pacman, grid) {

  document.removeEventListener('keydown', (e) =>
    pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard))
  );

  gameBoard.showGameStatus(gameWin);

  clearInterval(timer);
  // Show startbutton
  startButton.classList.remove('hide');
}

function checkCollision(pacman, ghosts) {
  const collidedGhost = ghosts.find((ghost) => pacman.pos === ghost.pos);

  if (collidedGhost) {
    if (pacman.powerPill) {
      gameBoard.removeObject(collidedGhost.pos, [
        OBJECT_TYPE.GHOST,
        OBJECT_TYPE.SCARED,
        collidedGhost.name
      ]);
      collidedGhost.pos = collidedGhost.startPos;
      score += 100;
    } else if (lives > 0) {
        gameBoard.removeObject(collidedGhost.pos, [
            OBJECT_TYPE.GHOST,
            OBJECT_TYPE.SCARED,
            collidedGhost.name
          ]);
          collidedGhost.pos = collidedGhost.startPos;
        lives -= 1;
    } else {
      gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PACMAN]);
      gameBoard.rotateDiv(pacman.pos, 0);
      gameOver(pacman, gameGrid);
      gameOverMain = true
    }
  }
}

function gameLoop(pacman, ghosts) {
  // 1. Move Pacman
  gameBoard.moveCharacter(pacman);
  // 2. Check Ghost collision on the old positions
  checkCollision(pacman, ghosts);
  // 3. Move ghosts
  ghosts.forEach((ghost) => gameBoard.moveCharacter(ghost));
  // 4. Do a new ghost collision check on the new positions
  checkCollision(pacman, ghosts);
  // 5. Check if Pacman eats a dot
  if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.DOT)) {

    gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.DOT]);
    // Remove a dot
    gameBoard.dotCount--;
    // Add Score
    score += 10;
  }
  // 6. Check if Pacman eats a power pill
  if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.PILL)) {

    gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PILL]);

    pacman.powerPill = true;
    score += 50;

    clearTimeout(powerPillTimer);
    powerPillTimer = setTimeout(
      () => (pacman.powerPill = false),
      POWER_PILL_TIME
    );
  }
  // 7. Change ghost scare mode depending on powerpill
  if (pacman.powerPill !== powerPillActive) {
    powerPillActive = pacman.powerPill;
    ghosts.forEach((ghost) => (ghost.isScared = pacman.powerPill));
  }
  // 8. Check if all dots have been eaten
  if (gameBoard.dotCount === 0) {
    gameWin = true;
    gameOver(pacman, gameGrid);
  }
  // 9. Show new score
  scoreTable.innerHTML = score;
  livesTotal.innerHTML = lives
  timeTotal.innerHTML = score
}

function startGame() {
//   playAudio(soundGameStart);

  gameWin = false;
  powerPillActive = false;
  score = 0;
  lives = 3
  time = 0

  startButton.classList.add('hide');
  
  restartButton.classList.remove('hide');
  pauseButton.classList.remove('hide');

  gameBoard.createGrid(LEVEL);

  const pacman = new Pacman(2, 287);
  gameBoard.addObject(287, [OBJECT_TYPE.PACMAN]);
  document.addEventListener('keydown', (e) =>
    pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard))
  );

  const ghosts = [
    new Ghost(5, 188, randomMovement, OBJECT_TYPE.BLINKY),
    new Ghost(4, 209, randomMovement, OBJECT_TYPE.PINKY),
    new Ghost(3, 230, randomMovement, OBJECT_TYPE.INKY),
    new Ghost(2, 251, randomMovement, OBJECT_TYPE.CLYDE)
  ];

  // Gameloop
  //timer = setInterval(() => gameLoop(pacman, ghosts), GLOBAL_SPEED);
  function mainLoop(currentTime){
        if (gameOverMain){
            if(confirm('you loss. press ok')){
                gameOverMain = false
                window.location = '/'
            }
            return
        }
        if (pauseGame){
            return
        }
        window.requestAnimationFrame(mainLoop)
        const secondsSinceLastRender = (currentTime-lastRenderTime)/1000
        if (secondsSinceLastRender < 1/ GLOBAL_SPEED) return
        lastRenderTime = currentTime
        //console.log(currentTime/1000)
        //time = currentTime
        gameLoop(pacman, ghosts)
    }
    window.requestAnimationFrame(mainLoop)
}

function restartGameMain(){
    window.location = '/'
}

function pauseGameMain(){
    pauseGame = true
    pauseButton.classList.add('hide');
    unPauseButton.classList.remove('hide');   
}

function hide(){
    restartButton.classList.add('hide');
    pauseButton.classList.add('hide');
    unPauseButton.classList.add('hide')
}

function unPause(){
    window.requestAnimationFrame(mainLoop)
}



// Initialize game
hide()
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGameMain)
pauseButton.addEventListener('click', pauseGameMain)
unPauseButton.addEventListener('click', unPause)