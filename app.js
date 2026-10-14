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



playButtonElement.addEventListener('click' , clickedSomething)
redTileElement.addEventListener('click',clickedSomething)
greenTileElement.addEventListener('click',clickedSomething)
yellowTileElement.addEventListener('click', clickedSomething)
blueTileElement.addEventListener('click' , clickedSomething)