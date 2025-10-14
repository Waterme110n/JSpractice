const clock = document.querySelector('.clock');
const body = document.querySelector('.body');
const center = document.createElement('div');
const hourArrow = document.createElement('div');
const minuteArrow = document.createElement('div');
const secundArrow = document.createElement('div');

function clockInit() {
  centerWidht = clock.clientWidth / 2 - 5;
  centerHeight = clock.clientHeight / 2 - 5; // 5 width and h8 lenth

  center.classList.add('centerCircle');
  center.style.left = `${centerWidht}px`;
  center.style.top = `${centerHeight}px`;

  clock.appendChild(center);

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

  for (i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      const smallSech = document.createElement('div');
      smallSech.classList.add('smallSech');

      const posHeightToSmallSech = (center.clientHeight - 20) / 2; //20 lenght heigth sech
      const posWidghtToSmallSech = (center.clientHeight - 4) / 2;
      smallSech.style.top = `${posHeightToSmallSech}px`;
      smallSech.style.left = `${posWidghtToSmallSech}px`;

      smallSech.style.transform = `rotate(${i * 6}deg) translate(0,245px) `;
      center.appendChild(smallSech);
    }
  }
}

function ArrowInit() {
  hourArrow.classList.add('hour');
  hourArrow.style.top = '5px' // 10/2
  center.appendChild(hourArrow);

  minuteArrow.classList.add('minute'); 
  minuteArrow.style.left = '1px' // (10-8)/2
  minuteArrow.style.top = '5px'
  center.appendChild(minuteArrow);

  secundArrow.classList.add('second');
  secundArrow.style.left = '4px' // (10-2)/2
  secundArrow.style.top = '5px'
  center.appendChild(secundArrow);
  
}

function ArrowMove(){
  let time = new Date;
  let second = time.getSeconds();
  secundArrow.style.transform = `rotate(${(second)*6 -180}deg)`;
  let minute = time.getMinutes();
  minuteArrow.style.transform = `rotate(${(minute+second/60)*6 - 180}deg)`;
  let hour = time.getHours();
  hourArrow.style.transform = `rotate(${(hour % 12 + minute / 60)*30 -180}deg)`

}

setInterval(ArrowMove,1000);
clockInit();
ArrowInit();
