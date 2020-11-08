import {game} from './game.js'
import {isFreezed} from './gameFlow.js'
import {draw, undraw} from './canvas.js'
import {tetrominos} from './tetrominos.js'

const {width} = game

function isAtRight() {
    return game.currentTetromino.some(index => (game.currentPosition + index + 1) % width === 0)
}

function isAtLeft() {
    return game.currentTetromino.some(index => (game.currentPosition + index) % width === 0)
}

function checkRotation(position = game.currentPosition) {
    if ((position + 1) % width < 4) {
        if (isAtRight()) {
            game.currentPosition++
            checkRotation(position)
        }
    } else if ((position) % width > 5) {
        if (isAtLeft()) {
            game.currentPosition--
            checkRotation(position)
        }
    }

    if (game.currentTetromino.some(index => game.squares[game.currentPosition + index].classList.contains('taken'))) {
        if (game.currentRotation === 0) {
            game.currentRotation = 3
        } else {
            game.currentRotation--
        }
        game.currentTetromino = tetrominos[game.tetrominoType][game.currentRotation]
    }
}

export function moveDown() {
    if (game.isStarted && !isFreezed() && !game.isPaused) {
        undraw()
        game.currentPosition += width
        draw()
    }
}

export function moveLeft() {
    if (game.isStarted && !game.isPaused) {
        undraw()
        const isAtLeftEdge = game.currentTetromino.some(index => (game.currentPosition + index) % width === 0)
        if (!isAtLeftEdge) game.currentPosition -= 1

        if (game.currentTetromino.some(index => game.squares[game.currentPosition + index].classList.contains('taken'))) {
            game.currentPosition += 1
        }
        draw()
    }
}

export function moveRight() {
    if (game.isStarted && !game.isPaused) {
        undraw()
        const isAtRightEdge = game.currentTetromino.some(index => (game.currentPosition + index) % width === width - 1)
        if (!isAtRightEdge) game.currentPosition += 1

        if (game.currentTetromino.some(index => game.squares[game.currentPosition + index].classList.contains('taken'))) {
            game.currentPosition -= 1
        }
        draw()
    }
}

export function rotate() {
    if (game.isStarted && !game.isPaused) {
        undraw()
        game.currentRotation++
        if (game.currentRotation === 4) {
            game.currentRotation = 0
        }
        game.currentTetromino = tetrominos[game.tetrominoType][game.currentRotation]
        checkRotation()
        draw()
        game.moveSound.play()
    }
}

function control(e) {
    switch (e.keyCode) {
        case 37:
            moveLeft()
            break
        case 65:
            moveLeft()
            break
        case 38:
            rotate()
            break
        case 87:
            rotate()
            break
        case 39:
            moveRight()
            break
        case 68:
            moveRight()
            break
        case 40:
            moveDown()
            break
        case 83:
            moveDown()
            break
    }
}

let interval
let timer

export function controlOn(fn) {
    clearInterval(interval)
    timer = setTimeout(() => {
        clearInterval(interval)
        interval = setInterval(fn, 100)
    }, 400)
    fn()
}

export function controlOff() {
    clearInterval(interval)
    clearTimeout(timer)
}

document.addEventListener('keydown', control)