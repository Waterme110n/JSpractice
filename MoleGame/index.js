let body = document.body;
let pits = document.querySelectorAll('.pit');
let nastya = document.querySelector('.nastya');

function showNastya(){
  let where = Math.ceil(Math.random()*3);
  console.log(where);
  let pos = pits[where-1].getBoundingClientRect();
  nastya.style.left = pos.left + 70 + 'px';
  nastya.style.top = pos.top - 90 + 'px'
  nastya.style.display = 'block';

}

showNastya();