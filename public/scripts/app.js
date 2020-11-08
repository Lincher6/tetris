import { game } from './game.js'
import { start_pause } from './gameFlow.js'
import { moveLeft, moveRight, moveDown, rotate } from './controls.js'
import {controlOff, controlOn} from "./controls.js";

document.addEventListener('DOMContentLoaded', () => {
  game.hiScore.textContent = game.hiScoreCount
  game.startButton.addEventListener('click', start_pause)

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    game.upButton.addEventListener('touchstart', () => controlOn(rotate))
    game.upButton.addEventListener('touchend', controlOff)
    game.upButton.addEventListener('touchcancel', controlOff)

    game.downButton.addEventListener('touchstart', () => controlOn(moveDown))
    game.downButton.addEventListener('touchend', controlOff)
    game.downButton.addEventListener('touchcancel', controlOff)

    game.rightButton.addEventListener('touchstart', () => controlOn(moveRight))
    game.rightButton.addEventListener('touchend', controlOff)
    game.rightButton.addEventListener('touchcancel', controlOff)

    game.leftButton.addEventListener('touchstart', () => controlOn(moveLeft))
    game.leftButton.addEventListener('touchend', controlOff)
    game.leftButton.addEventListener('touchcancel', controlOff)

  } else {
    game.upButton.addEventListener('mousedown', () => controlOn(rotate))
    game.upButton.addEventListener('mouseup', controlOff)

    game.downButton.addEventListener('mousedown', () => controlOn(moveDown))
    game.downButton.addEventListener('mouseup', controlOff)

    game.rightButton.addEventListener('mousedown', () => controlOn(moveRight))
    game.rightButton.addEventListener('mouseup', controlOff)

    game.leftButton.addEventListener('mousedown', () => controlOn(moveLeft))
    game.leftButton.addEventListener('mouseup', controlOff)
  }
})

