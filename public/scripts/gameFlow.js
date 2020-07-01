import { game } from './game.js'
import { draw, undraw, setRandomColor } from './canvas.js'
import { moveDown } from './controls.js'
import { tetrominos, displayTetrominos, colors } from './tetrominos.js'

const { startButton, score, gameOverText, musicTheme, width, landingSound, rowClearSound, pauseSound, gameOverSound } = game

export function start_pause() {
    if (game.isStarted) {
        if (!game.isPaused) {
            startButton.textContent = 'START'
            clearInterval(game.moveTimer)
            clearInterval(game.speedUpTimer)
            musicTheme.pause();
            game.isPaused = true
            pauseSound.play()
            game.grid.style.opacity = '.7'


        } else {
            startButton.textContent = 'PAUSE'
            game.moveTimer = setInterval(moveDown, game.speed)
            game.speedUpTimer = setInterval(speedFlow, 30000)
            musicTheme.play();
            game.isPaused = false
            pauseSound.pause()
            pauseSound.currentTime = 0
            game.grid.style.opacity = '1'
        }
    }
    else {
        newGame(game.squares)
    }
}

export function isFreezed() {
    if (game.currentTetromino.some(index => game.squares[game.currentPosition + index + width].classList.contains('taken'))) {
        game.currentTetromino.forEach(index => game.squares[game.currentPosition + index].classList.add('taken'))
        rowChecker()
        newTetromino()
        landingSound.play()
        draw()
        return true
    }
}

function checkGameOver() {
    if (game.currentTetromino.some(index => game.squares[game.currentPosition + index].classList.contains('taken'))) {
        gameOver()
    }
}

function newTetromino() {
    game.currentPosition = 4
    game.currentRotation = 0
    game.currentColor = game.displayColor
    game.tetrominoType = game.displayTetrominoType
    game.currentTetromino = tetrominos[game.tetrominoType][game.currentRotation]
    checkGameOver()
    generateTetromino()
}

function generateTetromino() {
    game.displaySquares.forEach(square => square.classList.remove('tetromino', game.displayColor))

    game.displayPosition = 1
    game.displayColor = setRandomColor()
    game.displayTetrominoType = Math.floor(Math.random() * tetrominos.length)
    game.displayCurrentTetromino = displayTetrominos[game.displayTetrominoType]

    game.displayCurrentTetromino.forEach(index => game.displaySquares[game.displayPosition + index].classList.add('tetromino', game.displayColor))
}

function newGame(squares) {
    gameOverText.style.display = 'none'

    squares.forEach(element => {
        element.classList.remove('tetromino', 'taken', 'red', 'blue', 'green', 'yellow', 'purple')
    });
    for (let i = 200; i < 210; i++) {
        squares[i].classList.add('taken')
    }

    game.isStarted = true
    startButton.textContent = 'PAUSE'
    gameOverText.style.display = 'none'
    game.scoreCount = 0
    score.textContent = game.scoreCount
    game.speed = 1000
    game.moveTimer = setInterval(moveDown, game.speed)
    game.speedUpTimer = setInterval(speedFlow, 30000)
    musicTheme.currentTime = 0
    musicTheme.play()
    generateTetromino()
    newTetromino()
    draw()
}

function gameOver() {
    gameOverSound.play()
    gameOverText.style.display = 'block'
    startButton.textContent = 'NEW GAME'
    game.isStarted = false
    clearInterval(game.moveTimer)
    clearInterval(game.speedUpTimer)
    musicTheme.pause();

    if (game.hiScoreCount < game.scoreCount) {
        localStorage.setItem('tetrisHiScore', game.scoreCount)
        game.hiScore.textContent = game.scoreCount
    }
}

function speedFlow() {
    if (game.speed >= 300) {
        clearInterval(game.moveTimer)
        game.speed -= 100
        game.moveTimer = setInterval(moveDown, game.speed)
    }
}

function rowChecker() {
    let rowsCount = 0

    for (let i = 0; i < 199; i += width) {
        const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9,];

        if (row.every(index => game.squares[index].classList.contains('taken'))) {
            rowsCount++
            game.squares.splice(i, width)
            let newRow = row.map(() => document.createElement('DIV'))
            game.squares = newRow.concat(game.squares)
        }
    }

    if (rowsCount > 0) {
        switch (rowsCount) {
            case 1: game.scoreCount += 10; break
            case 2: game.scoreCount += 25; break
            case 3: game.scoreCount += 50; break
            case 4: game.scoreCount += 100; break
        }

        score.textContent = game.scoreCount

        game.grid.innerHTML = null
        game.squares.forEach(square => game.grid.appendChild(square))
        rowClearSound.currentTime = 0
        rowClearSound.play()

        game.grid.classList.add('shake')
        setTimeout(() => {
            game.grid.classList.remove('shake')
        }, 500)
    }
}

