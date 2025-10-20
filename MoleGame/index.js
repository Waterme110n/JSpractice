let body = document.body;
let pits = document.querySelectorAll('.pit');
let nastya = document.querySelector('.nastya');

function showNastya() {
  let where = Math.ceil(Math.random() * 3);
  console.log(where);
  let pos = pits[where - 1].getBoundingClientRect();
  nastya.style.left = pos.left + 70 + 'px';
  nastya.style.top = pos.top + 10 + 'px'
  nastya.style.display = 'block';
  moveNastya();
}

function moveNastya() {
  let speed = Math.ceil(Math.random() * 50);
  let nastyaPos = nastya.getBoundingClientRect();
  const max = nastyaPos.top - nastyaPos.height / 1.5; 
  let nastyaInterval = setInterval(() => {
    nastyaPos = nastya.getBoundingClientRect();
    if (nastyaPos.top > max) {
      nastya.style.top = nastyaPos.top - 3 + 'px';
    } else {
      clearInterval(nastyaInterval); 
      nastya.style.display = 'none';
      setTimeout(showNastya, 1000); 
    }
  }, speed);
}

showNastya();