export const game = {
    grid: document.querySelector('#grid'),
    squares: Array.from(document.querySelectorAll('#grid div')),
    displaySquares: document.querySelectorAll('#grid-small div'),
    startButton: document.querySelector('#start-button'),
    upButton: document.querySelector('#up'),
    rightButton: document.querySelector('#right'),
    downButton: document.querySelector('#down'),
    leftButton: document.querySelector('#left'),
    score: document.querySelector('#score'),
    hiScore: document.querySelector('#hi-score'),
    gameOverText: document.querySelector('#game-over'),
    width: 10,
    scoreCount: 0,
    hiScoreCount: localStorage.getItem('tetrisHiScore') || 0,
    isStarted: false,
    isPaused: false,
    speed: 1000,
    moveTimer: null,
    speedUpTimer: null,
    musicTheme: new Audio('./assets/sound/track1.mp3'),
    landingSound: new Audio('./assets/sound/landing.wav'),
    moveSound: new Audio('./assets/sound/move.wav'),
    rowClearSound: new Audio('./assets/sound/row.wav'),
    pauseSound: new Audio('./assets/sound/pause.wav'),
    gameOverSound: new Audio('./assets/sound/gameOver.wav'),

    currentPosition: null,
    currentRotation: null,
    currentColor: null,
    tetrominoType: null,
    currentTetromino: null,

    displayPosition: null,
    displayColor: null,
    displayTetrominoType: null,
    displayCurrentTetromino: null

}

game.musicTheme.volume = .9
game.musicTheme.preload
game.musicTheme.loop = true
game.landingSound.volume = .7
game.landingSound.preload
game.moveSound.volume = .8
game.moveSound.preload
game.rowClearSound.volume = .7
game.rowClearSound.preload
game.pauseSound.volume = .7
game.pauseSound.preload
game.gameOverSound.volume = .7
game.gameOverSound.preload

