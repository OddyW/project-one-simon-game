console.log('Simon game')
const playButtonElement = document.querySelector('#playBtn')
const redTileElement = document.querySelector('#redTile')
const greenTileElement = document.querySelector('#greenTile')
const yellowTileElement = document.querySelector('#yellowTile')
const blueTileElement = document.querySelector('#blueTile')

console.log(playButtonElement)
console.log(redTileElement)
console.log(greenTileElement)
console.log(yellowTileElement)
console.log(blueTileElement)

//Variables
let simonSequence = []
let playerSequence = null
let round = 0
let isPlayerTurn = false

// placeholder funciton to test stuff
function clickedSomething(){
    console.log('Click is working!')
    redTileElement.textContent = "Clicked on red!"
    playButtonElement.textContent ="Game started"
}

function highlightTile(){
 //this function should highlite each tile when clicked, function will be used
 //by player and the game 

}

function gameTurn (){
    //this function will generate the sequence for the player to click
}

function playerChoice (){
    //this function will check what the player choice is, see if player is follwing the 
    //sequence correctly
}

function roundCounter (){
    //This function should track which round the player has reached
}

function scoreTracker(){
    //This function should keep track of player score, store highest score
    //and track the score during the game

}


//event listeners
playButtonElement.addEventListener('click' , clickedSomething)
redTileElement.addEventListener('click',clickedSomething)
greenTileElement.addEventListener('click',clickedSomething)
yellowTileElement.addEventListener('click', clickedSomething)
blueTileElement.addEventListener('click' , clickedSomething)