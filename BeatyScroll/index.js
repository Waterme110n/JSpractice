const scrollParent = document.querySelector('.scrollDiv');
const body = document.body;
let Car = {
  name: '',
  color: '',
  image: '',
  company: '',
  model: '',
  div: '',
  initCar(name, color, image, company, model) {
    this.name = name;
    this.color = color;
    this.image = image;
    this.company = company;
    this.model = model;
    return this;
  }
}
let Cars = [];
let verticalScroll = 0;
let horizontalScroll = 1;

function initCars() {
  for (i = 0; i < 4; i++) {
    Cars[i] = Object.assign({}, Car)
  }
  Cars[0].initCar('Porshe1', '#52616b', '3.png', 'Porshe', '911 GT2 RS');
  Cars[1].initCar('Porshe2', '#323232', '1.png', 'Porshe', '911 Carrera');
  Cars[2].initCar('Porshe3', '#09221b', '4.png', 'Porshe', '911 GT3');
  Cars[3].initCar('Porshe4', '#16120e', '2.png', 'Porshe', '911 GT3 RS');

  Cars.forEach(car => {
    let carPic = document.createElement('img');
    carPic.classList.add('carPic');
    carPic.setAttribute('src', `cars/${car.image}`)
    car.div = carPic;
    scrollParent.appendChild(carPic);
  });
}

function editWheel() {
  window.addEventListener('wheel', (event) => {
    event.preventDefault();
    verticalScroll = window.pageYOffset || document.documentElement.scrollTop;
    console.log(event.deltaY)

    const isMouseWheel = Math.abs(event.deltaY) >= 100;
    const isTouchpad = Math.abs(event.deltaY) < 99;

    if (isTouchpad) {
      if (event.deltaY < 0) {
        verticalScroll -= 10
        window.scrollTo(0, verticalScroll);
      } else {
        verticalScroll += 10
        window.scrollTo(0, verticalScroll);
      }

      if (verticalScroll >= 600 && verticalScroll <= 700) {
        event.preventDefault();
        window.scrollTo(0, 650);
        if (event.deltaY < 0) {
          srcollHoriz(horizontalScroll--);
        } else {
          srcollHoriz(horizontalScroll++);
        }
      }
    } else {
      if (event.deltaY < 0) {
        verticalScroll -= 50
        window.scrollTo(0, verticalScroll);
      } else {
        verticalScroll += 50
        window.scrollTo(0, verticalScroll);
      }
      if (verticalScroll >= 600 && verticalScroll <= 700) {
        event.preventDefault();
        window.scrollTo(0, 650);
        if (event.deltaY < 0) {
          srcollHoriz(horizontalScroll -=10);
        } else {
          srcollHoriz(horizontalScroll +=10);
        }
      }

    }
  }, { passive: false })
}

function srcollHoriz(scroll) {
  console.log(scroll);
  if (scroll <= 0) {
    return window.scrollTo(0, 599);
  } else if (scroll > 0 && scroll <= 500) {
    CarAnimations(scroll, 0)
  } else if (scroll > 500 && scroll <= 1000) {
    CarAnimations(scroll, 1)
  } else if (scroll > 1000 && scroll <= 1500) {
    CarAnimations(scroll, 2)
  } else if (scroll > 1500 && scroll <= 1760) {
    CarAnimations(scroll, 3)
  } else if (scroll > (1760 / 4) * Cars.length) {
    return window.scrollTo(0, 701);
  }
}


function CarAnimations(scroll, carNumber) {
  if (carNumber == 0) {
    showInfo(scroll, Cars[0]);
    changeBackground(scroll, Cars[0].color, Cars[1].color);

    if (scroll >= 0 && scroll <= 260) {
      scaleCarAnimation(scroll, Cars[0].div);
    } else if (scroll <= 500) {
      scrollParent.style.transform = `translate(-${(scroll - 260) * 5}px,0)`;
    }
  } else {
    let razn = carNumber * 500;

    if (Cars[carNumber + 1] !== undefined) {
      nextCarColor = Cars[carNumber + 1].color;
    } else {
      nextCarColor = Cars[carNumber].color;
    }
    changeBackground(scroll - razn, Cars[carNumber].color, nextCarColor);
    showInfo(scroll - razn, Cars[carNumber]);
    if (scroll >= razn && scroll <= razn + 260) {
      scaleCarAnimation(scroll - razn, Cars[carNumber].div);
    } else if (scroll >= razn + 260 && scroll <= razn + 500) {
      scrollParent.style.transform = `translate(-${(scroll - (260 * (carNumber + 1))) * 5}px,0)`;
    }
  }
}

function scaleCarAnimation(scroll, carElement) {

  if (scroll < 60) {
    carElement.style.transform = `scale(${1 + scroll / 50})`;
    carElement.style.transform += `translate(${-scroll * 2}px,0)`;
  }
  if (scroll > 200 && scroll < 260) {
    carElement.style.transform = `scale(${2.2 - ((scroll - 200) / 50)})`;
    carElement.style.transform += `translate(${-120 + (scroll - 200) * 2}px,0)`;
  }
}

function changeBackground(scroll, carColor, nextCarColor) {
  if (scroll > 260 && scroll < 500) {
    var percentage = (scroll - 260) / (500 - 260);
    var color = interpolateColors(carColor, nextCarColor, percentage);
    body.style.background = color;
  }
}

function interpolateColors(color1, color2, percentage) {
  color1 = hexToRgb(color1);
  color2 = hexToRgb(color2);

  var r = color1.r + (color2.r - color1.r) * percentage;
  var g = color1.g + (color2.g - color1.g) * percentage;
  var b = color1.b + (color2.b - color1.b) * percentage;

  return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function showInfo(scroll, carElement) {
  let bigInfo = document.querySelector('.bigLine');
  let smallInfo = document.querySelector('.smallLine');

  let carStartPos = carElement.div.getBoundingClientRect();
  let startX = carStartPos.left + carStartPos.width / 4;

  bigInfo.style.left = `${startX}px`;
  smallInfo.style.left = `${startX}px`;
  bigInfo.textContent = carElement.company;
  smallInfo.textContent = carElement.model;

  if (scroll >= 60 && scroll <= 120) {
    bigInfo.style.display = 'block';
    bigInfo.style.transform = `translate(${(scroll - 60) * 4.4}px, 0)`;
    bigInfo.style.width = `${(scroll - 60) * 50}px`;
  }
  if (scroll >= 80 && scroll <= 140) {
    smallInfo.style.display = 'block';
    smallInfo.style.transform = `translate(${(scroll - 80) * 4.4}px, 0)`;
    smallInfo.style.width = `${(scroll - 80) * 50}px`;
  }
  if (scroll >= 160 && scroll < 200) {
    bigInfo.style.display = 'block';
    bigInfo.style.transform = `translate(${264 - ((scroll - 160) * 7.5)}px,0)`;
    bigInfo.style.width = `${(3000 - (scroll - 160) * 75)}px`;

    smallInfo.style.display = 'block';
    smallInfo.style.transform = `translate(${264 - ((scroll - 160) * 7.5)}px,0)`;
    smallInfo.style.width = `${(3000 - (scroll - 160) * 75)}px`;
  }
  if (scroll < 60 || scroll > 200) {
    bigInfo.style.display = 'none';
    smallInfo.style.display = 'none';
  }
}

initCars();
editWheel();

//сделать еще для мышки и для прокрутки страницы
