var square = document.getElementById('square');

function optimaseSquareWindow() {
  square.classList.remove('squareV')
  square.classList.remove('squareh')

  if (window.innerHeight > window.innerWidth)
    square.classList.add('squareV')

  else
    square.classList.add('squareH')
}

optimaseSquareWindow();
window.addEventListener('resize', optimaseSquareWindow)