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

var snake = document.getElementById('snake');
let snakeSpeed = 0
let movement = ''
let nextmovement = '';
let snakeCountBody = [{ left: 0, top: 0 }]
let frameCount = 0;
let applePos = [];
let gameInterval;

function placeSnake() {
  let positionSnake = board.children[Math.floor(Math.random()*99)].getBoundingClientRect();
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

  moveSnakeFragment();
  appleTouch();
}


function addSnakeFragment() {
  const lastPart = snakeCountBody[snakeCountBody.length - 1];

  const snakeFragment = document.createElement('div');
  snakeFragment.classList.add('snakeFrag');

  snakeFragment.style.left = lastPart.left + 'px';
  snakeFragment.style.top = lastPart.top + 'px';
  body.appendChild(snakeFragment);

  snakeCountBody.push({ left: lastPart.left, top: lastPart.top });
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

function endGame() {
  const gameloseText = document.querySelector('.status');
  gameloseText.textContent = 'Game over';
  startButton.textContent = 'Start';
  document.getElementById('dificulty').disabled = false;
  movement = ''
  result();
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

function createApple() {

  let apple = document.createElement('div');
  apple.classList.add('apple');

  let appleCell = Math.floor(Math.random() * 99);

  if (applePos.some(item => appleCell == item.index)) {
    createApple();
    return;
  }

  const posAppleCell = board.children[appleCell].getBoundingClientRect();
  apple.style.left = posAppleCell.left + 3 + 'px';
  apple.style.top = posAppleCell.top + 3 + 'px';

  if (snakeCountBody.some(item =>
    Math.round(item.left) === Math.round(posAppleCell.left + 3) &&
    Math.round(item.top) === Math.round(posAppleCell.top + 3))) {
    createApple();
    return;
  }
  applePos.push({ index: appleCell, element: apple });
  body.appendChild(apple);
}

function appleTouch() {
  const snakePosition = snake.getBoundingClientRect();

  for (let i = 0; i < applePos.length; i++) {
    const { index, element } = applePos[i]
    const applePosition = board.children[index].getBoundingClientRect();

    if (snakePosition.left < applePosition.right &&
      snakePosition.right > applePosition.left &&
      snakePosition.top < applePosition.bottom &&
      snakePosition.bottom > applePosition.top
    ) {
      element.remove();
      applePos.splice(i, 1);
      addSnakeFragment();

      createApple();
      break;
    }
  }
}

function chooseDif() {
  const dificulty = document.getElementById('dificulty');
  const selectedValue = dificulty.value;
  switch (selectedValue) {
    case 'easy': {
      snakeSpeed = 20
      break;
    }
    case 'medium': {
      snakeSpeed = 10
      break;
    }
    case 'hard': {
      snakeSpeed = 5
      break;
    }
    case 'imposible': {
      snakeSpeed = 1
      break;
    }
  }
}

createBoard()

function clearBoard() {
  const snakeFragment = document.querySelectorAll('.snakeFrag');
  snakeFragment.forEach(el => { el.remove(); })
  const apples = document.querySelectorAll('.apple');
  apples.forEach(el => { el.remove(); })
  snakeCountBody.length = 0;
  applePos.length = 0
  clearInterval(gameInterval);
}

function startGame() {
  document.getElementById('dificulty').disabled = true
  clearBoard();
  chooseDif();
  placeSnake();
  createApple();
  gameInterval = setInterval(moveSnake, snakeSpeed)
}
function pause() {
  clearInterval(gameInterval);
}
function unPause() {
  gameInterval = setInterval(moveSnake, snakeSpeed)
}



const startButton = document.querySelector('.startgame');
startButton.addEventListener('click', e => {
  switch (startButton.textContent) {
    case 'Start': {
      startGame();
      startButton.textContent = 'Press to pause';
      document.querySelector('.status').textContent = 'Playing';
      break;
    }
    case 'Press to pause': {
      pause();
      startButton.textContent = 'Press to unpause';
      document.querySelector('.status').textContent = 'Pause';
      break;
    }
    case 'Press to unpause': {
      unPause();
      startButton.textContent = 'Press to pause';
      document.querySelector('.status').textContent = 'Playing';
      break;
    }
  }

})

let results = [];

function result() {
  let countApples = Math.floor(snakeCountBody.length / 30) - 1;
  let now = new Date;
  let date = now.getHours() + ':' + now.getMinutes();


  const dificulty = document.getElementById('dificulty');
  const dif = dificulty.value;

  results.push({countApples, date, dif});
  
  let resultSpis = document.querySelector('.result');
  resultSpis.innerHTML = '';

  for (res in results) {
    let doc = document.createElement('p');
    doc.textContent = results[res].dif + ' ' + results[res].countApples + ' in ' + results[res].date;
    resultSpis.appendChild(doc);
  }
}





