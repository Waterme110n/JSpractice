/*square*/
const board = document.getElementById('square');
const body = document.querySelector('body');
var boardSize = 10

function createBoard() {
  board.innerHTML = '';
  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      board.appendChild(cell);
    }
  }
}

/*snake*/
var snake = document.getElementById('snake');
let snakeSpeed = 10
let movement = 'right'
let nextmovement = '';
let snakeCountBody = [{ left: 0, top: 0 }]
let frameCount = 0;

function placeSnake() {
  let positionSnake = board.children[55].getBoundingClientRect();
  snake.style.left = positionSnake.left + 3 + 'px';
  snake.style.top = positionSnake.top + 3 + 'px';
  snakeCountBody.push({ left: positionSnake.left + 3, top: positionSnake.top + 3 })
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
  frameCount++;
  let currentLeft = parseInt(snake.style.left) || 0;
  let currentTop = parseInt(snake.style.top) || 0;

  if (checkCell() !== null) {
    nextmovement = movement;
  }

  snakeCountBody.unshift({ left: currentLeft, top: currentTop });

  const maxLength = document.querySelectorAll('.snakeFrag').length + 1;
  if (snakeCountBody.length > maxLength * 30) {
    snakeCountBody.pop();
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

  if (gameOver() === 1) {
    clearInterval(gameInterval);
  }

  moveSnakeFragment()
}

function gameOver() {
  const boardPosition = board.getBoundingClientRect();
  const snakePosition = snake.getBoundingClientRect();
  if (
    snakePosition.left < boardPosition.left ||
    snakePosition.top < boardPosition.top ||
    snakePosition.right > boardPosition.right ||
    snakePosition.bottom > boardPosition.bottom
  ) {
    endGame();
    return 1;
  }
  const fragments = document.querySelectorAll('.snakeFrag');

  for (let i = 2; i < fragments.length - 1; i++) {
    const fragRect = fragments[i].getBoundingClientRect();
    if (
      snakePosition.left < fragRect.right &&
      snakePosition.right > fragRect.left &&
      snakePosition.top < fragRect.bottom &&
      snakePosition.bottom > fragRect.top
    ) {
      endGame();
      return 1;
    }
  }
}


function endGame(){
    const gameloseText = document.createElement('div');
    gameloseText.textContent = 'game over';
    gameloseText.classList.add('gameover');
    body.appendChild(gameloseText)
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

createBoard()
placeSnake()
let gameInterval = setInterval(moveSnake, snakeSpeed)
setInterval(addSnakeBody, 5000)

/*добавить яблочки и дп рост за них*/
/*добавить сложности*/

/*яблочки*/

function addSnakeBody() {
  const lastPart = snakeCountBody[snakeCountBody.length - 1];

  const snakeFragment = document.createElement('div');
  snakeFragment.classList.add('snakeFrag');

  snakeFragment.style.left = lastPart.left + 'px';
  snakeFragment.style.top = lastPart.top + 'px';
  body.appendChild(snakeFragment);

  snakeCountBody.push({left: lastPart.left, top: lastPart.top});
}

function moveSnakeFragment() {
  const fragments = document.querySelectorAll('.snakeFrag');
  for (let i = 0; i < fragments.length; i++) {
    const index = (i + 1) * 30;
    if (snakeCountBody[index]) {
      fragments[i].style.left = snakeCountBody[index].left + 'px';
      fragments[i].style.top = snakeCountBody[index].top + 'px';
    }
  }
}


