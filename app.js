console.log('Simon game')
const playButtonElement = document.querySelector('#playBtn')
const redTileElement = document.querySelector('#redTile')
const greenTileElement = document.querySelector('#greenTile')
const yellowTileElement = document.querySelector('#yellowTile')
const blueTileElement = document.querySelector('#blueTile')
const messageElement = document.querySelector('#message')
const scoreElement = document.querySelector('#score')
const highScoreElement = document.querySelector('#highScore')

console.log(playButtonElement)
console.log(redTileElement)
console.log(greenTileElement)
console.log(yellowTileElement)
console.log(blueTileElement)
console.log(messageElement)
console.log(scoreElement)
console.log(highScoreElement)

//Variables
let simonSequence = []
let tiles = [redTileElement, greenTileElement, yellowTileElement, blueTileElement]
let playerSequence = null
let round = 0
let isPlayerTurn = false
let score = 0
let highScore = 0





// placeholder funciton to test stuff
function clickedSomething() {
    // console.log('Click is working!')
    // redTileElement.textContent = "Clicked on red!"
    // playButtonElement.textContent ="Game started"
    gameTurn()
    highlightTile(0)
    highlightTile(1)
    highlightTile(2)
    highlightTile(3)
    

}

function highlightTile(index) {
    //this function should highlite each tile when clicked, function will be used
    //by player and the game 

    tiles[index].classList.add('highLight')
    // console.log(tiles[index])
    setTimeout(function () {
        tiles[index].classList.remove('highLight')
    }, 500)

}




function gameTurn() {
    //this function will generate the random sequence for the player to click
    // simonSequence.push(Math.floor(Math.random() * 4))
    // console.log(simonSequence)
}

function playerChoice() {
    //this function will check what the player choice is, see if player is follwing the 
    //sequence correctly
}

function roundCounter() {
    //This function should track which round the player has reached
}

function scoreTracker() {
    //This function should keep track of player score, store highest score
    //and track the score during the game

}


//event listeners
playButtonElement.addEventListener('click', clickedSomething)
redTileElement.addEventListener('click', clickedSomething)
greenTileElement.addEventListener('click', clickedSomething)
yellowTileElement.addEventListener('click', clickedSomething)
blueTileElement.addEventListener('click', clickedSomething)