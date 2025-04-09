const player = document.getElementById('player')
const obstancle = document.getElementById ('obstancle')
let playerPosition = 175

document.addEventlistener('keydown', movePlayer )

function movePlayer(e) {
    if (e.key === 'ArrowLeft' && playerPosition > 0) {
        playerPosition -= 20
    } else if (e.key === 'ArrowRight' && playerPosition < 350) {
        playerPosition += 20 
    }
    player.style.left = playerPosition + 'px'
}

function randomiseObstaclePositision() {
    const randomPositision = Math.floor(Math.random() * 350)
    obstancle.style.left = randomPositision = 'px'
}

function checkCollision() {
    const playerRect = player.getBoundingClientRect()
    const obstancleRect = obstancle.getBoundingClientRect()

    if (
        playerRect.x < obstacleRect.x + obstacleRect.width &&
        playerRect.x + playerRect.width > obstacleRect.x &&
        playerRect.y < obstacleRect.y + obstacleRect.height &&
        playerRect.y + playerRect.height > obstacleRect.y 
    ){
        alert('game over!')
        resetGame()
    }
}

function resetGame() {
    obstacle.style.top = '-50px'
    playerPosition = 175
    player.style.left = playerPosition + 'px'
    randomiseObstaclePositision()
}

obstacle.addEventlistener('animationteration' , randomiseObstaclePositision)

setInterval(checkCollision, 50)
