console.log('Simon game')
const playButtonElement = document.querySelector('#playBtn')
const redTileElement = document.querySelector('#redTile')
const greenTileElement = document.querySelector('#greenTile')
const yellowTileElement = document.querySelector('#yellowTile')
const blueTileElement = document.querySelector('#blueTile')
const messageElement = document.querySelector('#message')
const scoreElement = document.querySelector('#score')
const highScoreElement = document.querySelector('#highScore')
const roundElement = document.querySelector('#round')
// const demoButtonElement = document.querySelector('#demoBtn')
const easyButtonElement = document.querySelector('#easyBtn')
const mediumButtonElement = document.querySelector('#mediumBtn')
const hardButtonElement = document.querySelector('#hardBtn')
const currentDifficultyElement = document.querySelector('#currentDiff')
const clearHighScoreElement = document.querySelector('#clearHighScore')
const tileBorderHLElement = document.querySelector('.tiles')
const muteButtonElement = document.querySelector('#muteBtn')
const soundElement = [
    document.querySelector('#xylo1'),
    document.querySelector('#xylo2'),
    document.querySelector('#xylo3'),
    document.querySelector('#xylo4'),
]



let simonSequence = []
let tiles = [redTileElement, greenTileElement, yellowTileElement, blueTileElement]
let playerIndex = 0
let gamePlaying = false
let round = 0
let isPlayerTurn = false
let score = 0
let highScore = 0
let isMuted = false

const difficulties = {
    // demo: {rounds: 5, startSpeed: 20, speedUp: 40, maxSpeed: 300},
    easy: { rounds: 10, startSpeed: 20, speedUp: 40, maxSpeed: 300 },
    medium: { rounds: 20, startSpeed: 60, speedUp: 50, maxSpeed: 500 },
    hard: { rounds: 30, startSpeed: 100, speedUp: 80, maxSpeed: 700 },
}
let speed = 0
let currentDifficulty = difficulties.easy



// function setDemo(){
//     if(gamePlaying) {return}
//     currentDifficulty = difficulties.demo
//     currentDifficultyElement.textContent = 'Demo'
//     console.log(currentDifficulty)
// }

function setEasy() {
    if (gamePlaying) { return }
    currentDifficulty = difficulties.easy
    currentDifficultyElement.textContent = 'Easy'
}

function setMedium() {
    if (gamePlaying) { return }
    currentDifficulty = difficulties.medium
    currentDifficultyElement.textContent = 'Medium'
}

function setHard() {
    if (gamePlaying) { return }
    currentDifficulty = difficulties.hard
    currentDifficultyElement.textContent = 'Hard'
}

function gameSpeed() {
    speed += currentDifficulty.speedUp


    if (speed > currentDifficulty.maxSpeed) {
        speed = currentDifficulty.maxSpeed
    }
    
}

function toggleMute() {
    isMuted = !isMuted

    const allAudio = document.querySelectorAll('audio')
    for (let i = 0; i < allAudio.length; i++) {
        allAudio[i].muted = isMuted
    }

    if (isMuted) {
        muteButtonElement.textContent = 'Unmute'
    } else {
        muteButtonElement.textContent = 'Mute'
    }
}

function playSimon() {
    if (gamePlaying && isPlayerTurn === false) { return }
    gamePlaying = true
    playButtonElement.textContent = "Restart"
    messageElement.textContent = ""
    simonSequence = []
    round = 0
    score = 0
    speed = currentDifficulty.startSpeed
    scoreElement.textContent = 0
    gameTurn()


}

function highlightTile(index) {

    soundElement[index].currentTime = 0
    soundElement[index].volume = 0.4
    soundElement[index].play()

    tiles[index].classList.add('highLight')

    setTimeout(function () {
        tiles[index].classList.remove('highLight')
    }, 250)

}



function gameTurn() {
    isPlayerTurn = false
    playerIndex = 0
    playButtonElement.classList.add('grey')
    tileBorderHLElement.classList.remove('playerTurn')
    messageElement.textContent = 'Simon Turn..'

    simonSequence.push(Math.floor(Math.random() * 4))


    round = simonSequence.length
    roundElement.textContent = round

    if (round > 1) {
        gameSpeed()
    }

    let delay = 0
    for (let i = 0; i < simonSequence.length; i++) {
        delay += 1000 - speed


        setTimeout(() => {
            highlightTile(simonSequence[i])
        }, delay);

    }

    setTimeout(() => {
        isPlayerTurn = true
        playButtonElement.classList.remove('grey')
        tileBorderHLElement.classList.add('playerTurn')
        messageElement.textContent = 'Your Turn!'
    }, delay + 700);
}

function playerChoice(event) {

    if (isPlayerTurn === false) {
        return
    }

    const tileIndex = tiles.indexOf(event.target)

    highlightTile(tileIndex)


    if (tileIndex !== simonSequence[playerIndex]) {
        gameOver()
        return
    }

    playerIndex++

    if (playerIndex === simonSequence.length) {
        isPlayerTurn = false
        tileBorderHLElement.classList.remove('playerTurn')
        scoreTracker()
        if (round === currentDifficulty.rounds) {
            wonSimon()
        } else {
            setTimeout(gameTurn, 700)
        }
    }

}

function gameOver() {
    isPlayerTurn = false
    gamePlaying = false
    playButtonElement.textContent = 'PLAY AGAIN'
    messageElement.textContent = 'You Lose at round: ' + round
    tileBorderHLElement.classList.remove('playerTurn')
}

function wonSimon() {
    isPlayerTurn = false
    gamePlaying = false
    playButtonElement.textContent = 'PLAY AGAIN'
    messageElement.textContent = 'You Win!'
    tileBorderHLElement.classList.remove('playerTurn')
}



function scoreTracker() {
    score = round
    scoreElement.textContent = score


    if (highScore < score) {
        highScore = score

        localStorage.setItem('gameHighScore', highScore);
    }

    highScoreElement.textContent = Number(localStorage.getItem('gameHighScore'))
}



function clearHighScore() {
    highScore = 0
    localStorage.removeItem('gameHighScore')
    highScoreElement.textContent = highScore
}


highScore = localStorage.getItem('gameHighScore') ? localStorage.getItem('gameHighScore') : 0
highScoreElement.textContent = highScore





playButtonElement.addEventListener('click', playSimon)
redTileElement.addEventListener('click', playerChoice)
greenTileElement.addEventListener('click', playerChoice)
yellowTileElement.addEventListener('click', playerChoice)
blueTileElement.addEventListener('click', playerChoice)
// demoButtonElement.addEventListener('click', setDemo)
easyButtonElement.addEventListener('click', setEasy)
mediumButtonElement.addEventListener('click', setMedium)
hardButtonElement.addEventListener('click', setHard)
clearHighScoreElement.addEventListener('click', clearHighScore)
muteButtonElement.addEventListener('click', toggleMute)


