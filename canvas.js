import { colors } from './tetrominos.js'
import { game } from './game.js'

export const setRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
}

export const draw = () => {
    game.currentTetromino.forEach(index => {
        game.squares[game.currentPosition + index].classList.add('tetromino', game.currentColor)
    })
}

export const undraw = () => {
    game.currentTetromino.forEach(index => {
        game.squares[game.currentPosition + index].classList.remove('tetromino', game.currentColor)
    })
}
