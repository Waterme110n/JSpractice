const clock = document.querySelector('.clock');
const body = document.querySelector('.body');

function clockInit() {
  clockCord = clock.getBoundingClientRect();
  console.log(clockCord)
  centerWidht = (clockCord.right - clockCord.left) / 2 + clockCord.left - 5;
  centerHeight = (clockCord.bottom - clockCord.top) / 2 + clockCord.top - 5; // 5 width and h8 lenth

  const center = document.createElement('div');
  center.classList.add('centerCircle');
  center.style.left = `${centerWidht}px`;
  center.style.top = `${centerHeight}px`;

  body.appendChild(center);

  for (i = 0; i < 12; i++) {
    const bigSech = document.createElement('div');
    bigSech.classList.add('bigSech');

    const posHeightToSech = (center.clientHeight - 40) / 2; //40 lenght heigth sech
    bigSech.style.top = `${posHeightToSech}px`;
    
    bigSech.style.transform = `rotate(${i * 30}deg) translate(0,240px) `;
    center.appendChild(bigSech);
  }

}

clockInit();