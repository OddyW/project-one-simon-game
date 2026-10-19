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
// console.log(playButtonElement)
// console.log(redTileElement)
// console.log(greenTileElement)
// console.log(yellowTileElement)
// console.log(blueTileElement)
// console.log(messageElement)
// console.log(scoreElement)
// console.log(highScoreElement)
// console.log(roundElement)
console.log(easyButtonElement)
console.log(mediumButtonElement)
console.log(hardButtonElement)
console.log(currentDifficultyElement)
console.log(clearHighScoreElement)
console.log(tileBorderHLElement)
//Variables
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
    easy: {rounds: 10, startSpeed: 20, speedUp: 40, maxSpeed: 300},
    medium: {rounds: 20, startSpeed: 60, speedUp: 50, maxSpeed: 500 },
    hard: {rounds: 30, startSpeed: 100, speedUp: 80, maxSpeed: 700},
}
let speed = 0
let currentDifficulty = difficulties.easy


// gameTurn()


// placeholder funciton to test stuff
// function clickedSomething() {
    // console.log('Click is working!')
    // redTileElement.textContent = "Clicked on red!"
    // playButtonElement.textContent ="Game started"
    // gameTurn()
    // highlightTile(0)
    // highlightTile(1)
    // highlightTile(2)
    // highlightTile(3)
    // rotate()

// }

function setEasy(){
    if(gamePlaying) {return}
    currentDifficulty = difficulties.easy
    currentDifficultyElement.textContent = 'Easy'
    console.log(currentDifficulty)
}

function setMedium(){
    if(gamePlaying) {return}
    currentDifficulty = difficulties.medium
    currentDifficultyElement.textContent = 'Medium'
    console.log(currentDifficulty)
}

function setHard(){
    if(gamePlaying) {return}
    currentDifficulty = difficulties.hard
    currentDifficultyElement.textContent = 'Hard'
    console.log(currentDifficulty.rounds)
}

function gameSpeed(){
    speed += currentDifficulty.speedUp
    

    if (speed > currentDifficulty.maxSpeed){
        speed = currentDifficulty.maxSpeed
    }
    console.log(speed)
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
    if (gamePlaying && isPlayerTurn === false) {return}
    gamePlaying = true
    playButtonElement.textContent = "Restart"
    messageElement.textContent = ""
    simonSequence = []
    round = 0
    score = 0
    speed = currentDifficulty.startSpeed
    scoreElement.textContent = 0
    gameTurn()

    console.log(speed)
}

function highlightTile(index) {
    //this function should highlite each tile when clicked, function will be used
    //by player and the game 
    //this function is index based as the four tiles are stored in an array, using index to help calling them individually
    //classList is utilized here to add/remove the styling along the setInterval() so it makes a nice looking flashing/highlighting tiles
    soundElement[index].currentTime = 0 //resets the audio file so it always plays from start
    soundElement[index].volume = 0.4
    soundElement[index].play() // plays the audio

    tiles[index].classList.add('highLight')
    // console.log(tiles[index])
    setTimeout(function () {
        tiles[index].classList.remove('highLight')
    }, 250)

}



function gameTurn() {
    //this function will generate the random sequence for the player to click
    isPlayerTurn = false
    playerIndex = 0
    playButtonElement.classList.add('grey')
    tileBorderHLElement.classList.remove('playerTurn')
    messageElement.textContent = 'Simon Turn..'
    simonSequence.push(Math.floor(Math.random() * 4))
    //
    console.log(simonSequence)

    round = simonSequence.length
    roundElement.textContent = round

    if (round > 1){
        gameSpeed()
    }

    let delay = 0
    for(let i=0; i<simonSequence.length; i++){
        delay+= 1000 - speed
        // console.log("i:"+ i + " random:" + simonSequence[i])
        
        
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
    //this function will check what the player choice is, see if player is follwing the 
    //sequence correctly
    if (isPlayerTurn === false) {
        return
    } //checks player turn, if it is false, player can't press tiles during gamePlaying

    const tileIndex = tiles.indexOf(event.target)

    highlightTile(tileIndex)

    //checks for wrong plays
    if(tileIndex !== simonSequence[playerIndex]){ //player loses instantly when clikcing wrong tile
        console.log('WRONG')
        gameOver() 
        return
      }

    playerIndex++

    if(playerIndex === simonSequence.length){ //this the correct if, also stop player turn once done 
        isPlayerTurn = false
        tileBorderHLElement.classList.remove('playerTurn')
        console.log('CORRECT')
        scoreTracker()
        if(round === currentDifficulty.rounds){
            wonSimon()
        } else { //if rounds not equal totalRounds then keep playing!
            setTimeout(gameTurn,700)
        }
    }

}

function gameOver(){
    isPlayerTurn = false
    gamePlaying = false
    playButtonElement.textContent = 'PLAY AGAIN'
    messageElement.textContent = 'You Lose at round: ' + round
    tileBorderHLElement.classList.remove('playerTurn')
}

function wonSimon(){
    isPlayerTurn = false
    gamePlaying = false
    playButtonElement.textContent = 'PLAY AGAIN'
    messageElement.textContent = 'You Win!'
    tileBorderHLElement.classList.remove('playerTurn')
}



function scoreTracker() {
    //This function should keep track of player score, store highest score
    //and track the score during the game
    score = round
    scoreElement.textContent = score

    //updating high score
    if(highScore < score){
        highScore = score

        localStorage.setItem('gameHighScore', highScore);
    }
    console.log('HighScore: '+highScore)
    highScoreElement.textContent = Number(localStorage.getItem('gameHighScore'))
}



function clearHighScore(){
    highScore = 0
    localStorage.removeItem('gameHighScore')
    highScoreElement.textContent = highScore
}




//event listeners
playButtonElement.addEventListener('click', playSimon)
redTileElement.addEventListener('click', playerChoice)
greenTileElement.addEventListener('click', playerChoice)
yellowTileElement.addEventListener('click', playerChoice)
blueTileElement.addEventListener('click', playerChoice)
easyButtonElement.addEventListener('click', setEasy)
mediumButtonElement.addEventListener('click' ,setMedium)
hardButtonElement.addEventListener('click' , setHard)
clearHighScoreElement.addEventListener('click',clearHighScore)
muteButtonElement.addEventListener('click', toggleMute)



highScore = localStorage.getItem('gameHighScore') ?  localStorage.getItem('gameHighScore') : 0
highScoreElement.textContent = highScore