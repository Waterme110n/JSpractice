const body = document.body;
const pits = document.querySelectorAll('.pit');
const nastya = document.querySelector('.nastya');
const pointsDiv = document.querySelector('.points')
let points = 0;
let nastyaInterval;

function showNastya() {
  let where = Math.ceil(Math.random() * 3);
  let pos = pits[where - 1].getBoundingClientRect();
  nastya.style.left = pos.left + 70 + 'px';
  nastya.style.top = pos.top + 10 + 'px'
  nastya.style.display = 'block';
  moveNastya();
  console.log(points)
}

function moveNastya() {
  let speed = Math.ceil(Math.random() * 50);
  let nastyaPos = nastya.getBoundingClientRect();
  const max = nastyaPos.top - nastyaPos.height / 1.5;
  nastyaInterval = setInterval(() => {
    nastyaPos = nastya.getBoundingClientRect();
    if (nastyaPos.top > max) {
      nastya.style.top = nastyaPos.top - 3 + 'px';
    } else {
      points -= 25
      pointsDiv.textContent = points
      clearInterval(nastyaInterval);
      nastya.style.display = 'none';
      setTimeout(showNastya, speed*10);
    }
  }, speed);
}

nastya.addEventListener('click', () => {
  points += 50
  pointsDiv.textContent = points
  clearInterval(nastyaInterval);
  nastya.style.display = 'none';
  setTimeout(showNastya, 1000);
})

// can add menu and dificulties but do this in another projects
showNastya();