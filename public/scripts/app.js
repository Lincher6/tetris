import { tetrominos, displayTetrominos, colors } from './tetrominos.js'
import { game } from './game.js'
import { start_pause } from './gameFlow.js'
import { moveLeft, moveRight, moveDown, rotate } from './controls.js'

document.addEventListener('DOMContentLoaded', () => {
  game.hiScore.textContent = game.hiScoreCount
  game.startButton.addEventListener('click', start_pause)

  game.upButton.addEventListener('click', rotate)
  game.rightButton.addEventListener('click', moveRight)
  game.downButton.addEventListener('click', moveDown)
  game.leftButton.addEventListener('click', moveLeft)

})

