/*square*/
var square = document.getElementById('square');

function optimaseSquareWindow() {
  square.classList.remove('squareV')
  square.classList.remove('squareH')

  if (window.innerHeight > window.innerWidth)
    square.classList.add('squareV')

  else
    square.classList.add('squareH')
}

optimaseSquareWindow();
window.addEventListener('resize', optimaseSquareWindow)

/*snake*/
var snake = document.getElementById('snake');
let snakeSpeed = 1000
let movement = 'left'

function placeSnake() {
  snake.style.left = (window.innerWidth / 2) + 'px';
  snake.style.top = (window.innerHeight / 2) + 'px';
}

function moveSnake() {
  let currentLeft = parseInt(snake.style.left) || 0;
  let currentTop = parseInt(snake.style.top) || 0;
  switch (movement) {
    case 'left':
      snake.style.left = (currentLeft - 10) + 'px';
      break;
    case 'right': snake.style.left = (currentLeft + 10) + 'px';
      break;
    case 'top': snake.style.top = (currentTop - 10) + 'px';
      break;
    case 'bottom': snake.style.top = (currentTop + 10) + 'px';
      break;
  }
}

document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
      movement = 'top'
      break;
    case 'ArrowDown':
      movement = 'bottom'
      break;
    case 'ArrowLeft':
      movement = 'left'
      break;
    case 'ArrowRight':
      movement = 'right'
      break;
  }
})

placeSnake()
setInterval(moveSnake, snakeSpeed)
