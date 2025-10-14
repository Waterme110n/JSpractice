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

    const posHeightToBigSech = (center.clientHeight - 40) / 2; //40 lenght heigth sech
    const posWidghtToBigSech = (center.clientHeight - 6) / 2; 
    bigSech.style.top = `${posHeightToBigSech}px`;
    bigSech.style.left = `${posWidghtToBigSech}px`;

    bigSech.style.transform = `rotate(${i * 30}deg) translate(0,235px) `;
    center.appendChild(bigSech);
  }

  for (i = 0; i < 72; i++) {
    if (i % 6 !== 0) {
      const smallSech = document.createElement('div');
      smallSech.classList.add('smallSech');

      const posHeightToSmallSech = (center.clientHeight - 20) / 2; //20 lenght heigth sech
      const posWidghtToSmallSech = (center.clientHeight - 4) / 2; 
      smallSech.style.top = `${posHeightToSmallSech}px`;
      smallSech.style.left = `${posWidghtToSmallSech}px`;

      smallSech.style.transform = `rotate(${i * 5}deg) translate(0,245px) `;
      center.appendChild(smallSech);
    }
  }
}

clockInit();