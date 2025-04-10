const canvas = document.getElementById("gameArea")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = gameArea.getContext("2d")
ctx.imageSmoothingEnabled = false
const dt = 0.01

const aster1_img = new Image()
aster1_img.src = 'src/asteroid1.png'
const aster2_img = new Image()
aster2_img.src = 'src/asteroid2.png'
const aster3_img = new Image()
aster3_img.src = 'src/asteroid3.png'

const player_img = new Image();
player_img.src = 'src/spaceship.png'

let prt_del = 0
let ast_spa = 0
let score = 0

//p - player
let p = {
    x: canvas.width/2,
    y: canvas.height/2,
    sx: 0,
    sy: 0,
    dx: 0,
    dy: 0,
    ds: 12,
    a: 0,
    as: 4,
}
//k - keys
let k = {
    a: false,
    d: false,
    w: false,
    s: false,
}

class Particle {
  constructor(a, x, y, dx, dy) {
    this.tl = 1
    this.size = Math.random() * 10
    this.a = a - Math.PI / 2 + (Math.random() - 0.5)
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'
  }
}

let particles = []

class Asteroid {
  constructor() {
    var xyz = Math.round(Math.round(Math.random() * 3))
    this.size = 50 * xyz,
    this.img = (xyz <= 1) ? (aster1_img) : ((xyz <= 2) ? (aster2_img) : ((xyz <= 3) ? (aster3_img) : (aster1_img))),
    this.a = Math.random(),
    this.x = Math.random() > 0.5 ? canvas.width : 0,
    this.y = Math.random() > 0.5 ? canvas.height : 0,
    this.dx = this.x > canvas.width/2 ? -(Math.random() + 0.1) * Math.sqrt(score) - 1: (Math.random() + 0.1) * Math.sqrt(score) + 1,
    this.dy = this.y > canvas.height/2 ? -(Math.random() + 0.1) * Math.sqrt(score) - 1 : (Math.random() + 0.1) * Math.sqrt(score) + 1
  }
}

let asteroids = []

function drawParticle(particle) {
  ctx.beginPath()
  ctx.save()
  ctx.translate(particle.x, particle.y)
  ctx.rotate(-particle.a)
  ctx.translate(-Math.round(particle.size)/2, 15 + -Math.round(particle.size)/2)

  ctx.rect(0, 0, particle.size, particle.size)
  ctx.fillStyle = particle.color
  ctx.fill()

  ctx.restore()
  ctx.closePath()
}

function drawAsteroid(asteroid) {
  ctx.beginPath()
  ctx.save()
  ctx.translate(asteroid.x, asteroid.y)
  ctx.rotate(asteroid.a)
  ctx.translate(-Math.round(asteroid.size)/2, -Math.round(asteroid.size)/2)

  ctx.drawImage(asteroid.img, 0, 0, asteroid.size, asteroid.size)
  ctx.fillStyle = 'white'
  ctx.fill()

  ctx.restore()
  ctx.closePath()
}

function drawPlayer() {
    ctx.beginPath()
    ctx.save()
    ctx.translate(p.x, p.y)
    ctx.rotate(p.a)
    ctx.translate(-25, -25)

    ctx.drawImage(player_img, 0, 0, 50, 50)
    ctx.fillStyle = 'white'
    ctx.fill()

    ctx.restore()
    ctx.closePath()

}

function drawScore() {
  ctx.beginPath()
  ctx.font = '30px Arial'
  ctx.fillStyle = 'white'
  score += dt
  ctx.fillText(Math.floor(score), 50, 50)
  ctx.closePath()
}

function lerp(a, b, t) {
	return a - (a - b) * t
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    ast_spa -= dt
    if(ast_spa <= 0) {
      asteroids.push(new Asteroid())
      ast_spa = 1
    }

    for (let i = 0; i < asteroids.length; i++) {
      asteroids[i].x += asteroids[i].dx
      asteroids[i].y += asteroids[i].dy
      if (asteroids[i].x > canvas.width || asteroids[i].x < -canvas.width) {
        asteroids.splice(i, 1)
        continue
      }
      if (Math.abs(asteroids[i].x - p.x) < asteroids[i].size/1.5 && Math.abs(asteroids[i].y - p.y) < asteroids[i].size/1.5) {
        alert("Ваш счет: " + Math.floor(score))
        score = 0
        p = {
          x: canvas.width/2,
          y: canvas.height/2,
          sx: 0,
          sy: 0,
          dx: 0,
          dy: 0,
          ds: 12,
          a: 0,
          as: 4,
        }
        let k = {
          a: false,
          d: false,
          w: false,
          s: false,
      }
        asteroids = []
        particles = []
      }
      drawAsteroid(asteroids[i])
    }

    for (let i = 0; i < particles.length; i++) {
      particles[i].x += particles[i].dx
      particles[i].y += particles[i].dy
      particles[i].dx = Math.sin(particles[i].a)
      particles[i].dy = Math.cos(particles[i].a)
      particles[i].tl -= dt
      if(particles[i].tl <= 0) {
        particles.shift()
        continue
      }
      drawParticle(particles[i])
    }

    drawPlayer()
    drawScore()
    
    p.x += p.dx
    p.y += p.dy
    if(p.x > canvas.width + 50 || p.x < -50) {
      p.x = canvas.width - p.x
    }
    if(p.y > canvas.height + 50 || p.y < -50) {
      p.y = canvas.height - p.y
    }
    
    p.dx = lerp(p.dx, 0, 0.5 * dt)
    p.dy = lerp(p.dy, 0, 0.5 * dt)

    if(k.a == true) {
        p.a -= p.as * dt
    }
    if(k.d == true) {
        p.a += p.as * dt
    }
    if(k.w == true) {
        p.dx += p.ds * Math.cos(p.a) * dt
        p.dy += p.ds * Math.sin(p.a) * dt
        prt_del -= dt
        if(prt_del <= 0) {
          prt_del = 0.001
          particles.push(new Particle(-p.a, p.x, p.y, p.dx, p.dy))
        }
    }
    if(k.s == true) {
        p.dx -= p.ds * Math.cos(p.a) * dt
        p.dy -= p.ds * Math.sin(p.a) * dt
        prt_del -= dt
        if(prt_del <= 0) {
          prt_del = 0.001
          particles.push(new Particle(Math.PI - p.a, p.x, p.y, p.dx, p.dy))
        }
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === 'a') {
      k.a = true
    } else if (e.key === 'd') {
      k.d = true
    } else if (e.key === 'w') {
      k.w = true
    } else if (e.key === 's') {
      k.s = true
    }
}
  
function keyUpHandler(e) {
    if (e.key === 'a') {
      k.a = false;
    } else if (e.key === 'd') {
      k.d = false;
    } else if (e.key === 'w') {
      k.w = false;
    } else if (e.key === 's') {
      k.s = false;
    }
}

setInterval(draw, 10)