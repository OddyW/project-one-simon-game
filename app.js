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

// console.log(playButtonElement)
// console.log(redTileElement)
// console.log(greenTileElement)
// console.log(yellowTileElement)
// console.log(blueTileElement)
// console.log(messageElement)
// console.log(scoreElement)
// console.log(highScoreElement)
console.log(roundElement)

//Variables
let simonSequence = []
let tiles = [redTileElement, greenTileElement, yellowTileElement, blueTileElement]
let playerIndex = 0
let gamePlaying = false
let round = 0
let isPlayerTurn = false
let score = 0
let highScore = 0


// gameTurn()


// placeholder funciton to test stuff
function clickedSomething() {
    // console.log('Click is working!')
    // redTileElement.textContent = "Clicked on red!"
    // playButtonElement.textContent ="Game started"
    gameTurn()
    // highlightTile(0)
    // highlightTile(1)
    // highlightTile(2)
    // highlightTile(3)
    // rotate()

}

function play() {
    
    gamePlaying = true
    playButtonElement.textContent = "Restart"
    messageElement.textContent = ""
    simonSequence = []
    round = 0
    score = 0
    scoreElement.textContent = 0
    gameTurn()

    
}

function highlightTile(index) {
    //this function should highlite each tile when clicked, function will be used
    //by player and the game 
    //this function is index based as the four tiles are stored in an array, using index to help calling them individually
    //classList is utilized here to add/remove the styling along the setInterval() so it makes a nice looking flashing/highlighting tiles

    tiles[index].classList.add('highLight')
    // console.log(tiles[index])
    setTimeout(function () {
        tiles[index].classList.remove('highLight')
    }, 400)

}

// for(let i=0; i<4; i++){
//     setInterval(function(){
//         console.log(highlightTile(i))
//     }, 1700)

// }

// setInterval(()=>{
//     for(let i=0; i<4; i++){
//         console.log(i)
//     }
// },1000)

//this function is for testing purposes
// function rotate() {
//     counter = 0
//     let speed = 0
//     function startInterval() {
//         const intervalId = setInterval(() => {
//             highlightTile(counter)
//             counter++
//             if (counter > 3) {
//                 counter = 0
//                 speed += 100
//             }
//             //cap speed 0, 300 , 600 , 900 etc...
//             if(speed>600){
//                 speed = 600
//             }
//             console.log(counter + ' ' + speed)
//             clearInterval(intervalId)
//             startInterval()


//         }, 1000 - speed)
//     }
//     startInterval()
// }

function rotate(){
    let counter = 0
    let speed = 0
    
    function startInterval(){
        const intervalId = setInterval(()=>{
            highlightTile(counter)
            counter = Math.floor(Math.random()*4)
            // counter++ //call the highlitecounter func and then increase count to go to next tile
            
            if(counter > 3){ //set counter back to 0 to restart cycle
                counter = 0
                 //increase speed by 100ms every full cycle
            }

            if(counter >= 0){ //increases speed at every tile
                speed += 50
            }

            if(speed > 600){ //caps the speed at 600ms
                speed = 600
            }

            console.log(counter+" Speed: " + speed)
            clearInterval(intervalId) //clears interval?
            startInterval()
        }, 1000 - speed)
    }

    startInterval()
}

// rotate()

function gameTurn() {
    //this function will generate the random sequence for the player to click
    isPlayerTurn = false
    playerIndex = 0
    playButtonElement.classList.add('grey')

    simonSequence.push(Math.floor(Math.random() * 4))
    console.log(simonSequence)

    round = simonSequence.length
    roundElement.textContent = round

    let delay = 0
    for(let i=0; i<simonSequence.length; i++){
        delay+= 1000
        console.log("i:"+ i + " random:" + simonSequence[i])
        
        
        setTimeout(() => {
            highlightTile(simonSequence[i])
        }, delay);
        
    }

    setTimeout(() => {
       isPlayerTurn = true
       playButtonElement.classList.remove('grey') 
    }, delay + 500);
}

function playerChoice() {
    //this function will check what the player choice is, see if player is follwing the 
    //sequence correctly
}

// setTimeout(()=>{
//     console.log('hi')
// },1000)

// setInterval(()=>{
    // console.log('hi')
// },1000)

function scoreTracker() {
    //This function should keep track of player score, store highest score
    //and track the score during the game

}


//event listeners
playButtonElement.addEventListener('click', play)
redTileElement.addEventListener('click', clickedSomething)
greenTileElement.addEventListener('click', clickedSomething)
yellowTileElement.addEventListener('click', clickedSomething)
blueTileElement.addEventListener('click', clickedSomething)