/*square*/
const board = document.getElementById('square');
var boardSize = 10

function createboard() {
  board.innerHTML = '';
  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      board.appendChild(cell);
    }
  }
}
createboard()

/*snake*/
var snake = document.getElementById('snake');
let snakeSpeed = 10
let movement = 'right'
let nextmovement = '';



function placeSnake() {
  let positionSnake = board.children[55].getBoundingClientRect();
  snake.style.left = positionSnake.left + 3 + 'px';
  snake.style.top = positionSnake.top + 3 + 'px';
}

function checkCell() {
  for (let i = 0; i < board.children.length; i++) {
    const cellRect = board.children[i].getBoundingClientRect();
    const snakeRect = snake.getBoundingClientRect();
    if (snakeRect.left >= (cellRect.left + 3) && snakeRect.right < (cellRect.right - 3) &&
      snakeRect.top >= (cellRect.top + 3) && snakeRect.bottom < (cellRect.bottom - 3)) {
      return i;
    }
  }
  return null
}

function moveSnake() {
  let currentLeft = parseInt(snake.style.left) || 0;
  let currentTop = parseInt(snake.style.top) || 0;
  if (checkCell() !== null) {
    nextmovement = movement;
  }
  switch (nextmovement) {
    case 'left':
      snake.style.left = (currentLeft - 1) + 'px';
      break;
    case 'right':
      snake.style.left = (currentLeft + 1) + 'px';
      break;
    case 'top':
      snake.style.top = (currentTop - 1) + 'px';
      break;
    case 'bottom':
      snake.style.top = (currentTop + 1) + 'px';
      break;
  }
  if (gameover() === 1){
    clearInterval(gameInterval);
  }

}

function gameover() {
  const boardPosition = board.getBoundingClientRect()
  const snakePosition = snake.getBoundingClientRect()
  if (snakePosition.left < boardPosition.left ||
    snakePosition.top < boardPosition.top ||
    snakePosition.right > boardPosition.right ||
    snakePosition.bottom > boardPosition.bottom
  ) {
  const gameloseText = document.createElement('div');
  gameloseText.textContent = 'game over';
  gameloseText.classList.add('gameover');
  const body = document.querySelector('body');
  body.appendChild(gameloseText)
    return 1;
  }
}


document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
      if (movement != 'bottom') {
        movement = 'top'
      }
      break;
    case 'ArrowDown':
      if (movement != 'top') {
        movement = 'bottom'
      }
      break;
    case 'ArrowLeft':
      if (movement != 'right') {
        movement = 'left'
      }
      break;
    case 'ArrowRight':
      if (movement != 'left') {
        movement = 'right'
      }
      break;
  }
})


placeSnake()
let gameInterval = setInterval(moveSnake, snakeSpeed)

/*добавить яблочки и доп рост за них*/
/*добавить сложности*/
