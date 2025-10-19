const scrollParent = document.querySelector('.scrollDiv');
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

function initCars() {
  for (i = 0; i < 4; i++) {
    Cars[i] = Object.assign({}, Car)
  }
  Cars[0].initCar('Porshe1', 'multicolor', '3.png', 'Porshe', '911 GT2 RS');
  Cars[1].initCar('Porshe2', 'white', '1.png', 'Porshe', '911 Carrera');
  Cars[2].initCar('Porshe3', 'green', '4.png', 'Porshe', '911 GT3');
  Cars[3].initCar('Porshe4', 'brown', '2.png', 'Porshe', '911 GT3 RS');

  Cars.forEach(car => {
    let carPic = document.createElement('img');
    carPic.classList.add('carPic');
    carPic.setAttribute('src', `cars/${car.image}`)
    car.div = carPic;
    scrollParent.appendChild(carPic);
  });
}

let horizontalScroll = 1
//for touchpad
function editScroll() {
  window.addEventListener('wheel', (event) => {
    verticalScroll = window.pageYOffset || document.documentElement.scrollTop;
    // console.log(verticalScroll)
    if (verticalScroll >= 600 && verticalScroll <= 700) {
      event.preventDefault();
      window.scrollTo(0, 650);
      if (event.deltaY < 0) {
        srcollHoriz(horizontalScroll--);
      } else {
        srcollHoriz(horizontalScroll++);
      }
    }
  }, { passive: false })

}

function srcollHoriz(scroll) {

  for (let i = 0; i < Cars.length; i++) {
    CarAnimations(scroll, i);
  }

  if (scroll <= 0) {
    return window.scrollTo(0, 599);
  } else if (scroll > (1760/4) * Cars.length) {
    return window.scrollTo(0, 701);
  }
}


function CarAnimations(scroll, carNumber) {
  console.log(scroll);
  if (carNumber == 0) {
    if (scroll >= 0 && scroll <= 260) {
      ScaleCarAnimation(Cars[0].div, scroll);
    } else if (scroll <= 500) {
      scrollParent.style.transform = `translate(-${(scroll - 260) * 5}px,0)`;
    }
  } else {
    let razn = carNumber * 500;
    if (scroll >= razn && scroll <= razn + 260) {
      ScaleCarAnimation(Cars[carNumber].div, scroll - razn);
    } else if (scroll >= razn + 260 && scroll <= razn + 500) {
      scrollParent.style.transform = `translate(-${(scroll - (260 * (carNumber + 1))) * 5}px,0)`;
    }
  }

}

function ScaleCarAnimation(carElement, scroll) {

  if (scroll < 60) {
    carElement.style.transform = `scale(${1 + scroll / 50})`;
    carElement.style.transform += `translate(${-scroll * 2}px,0)`;
  }
  if (scroll > 200 && scroll < 260) {
    carElement.style.transform = `scale(${2.2 - ((scroll - 200) / 50)})`;
    carElement.style.transform += `translate(${-120 + (scroll - 200) * 2}px,0)`;
  }

}



initCars();
editScroll();





