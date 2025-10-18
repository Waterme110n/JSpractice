const scrollParent = document.querySelector('.scrollDiv');

let Car = {
  name: '',
  color: '',
  image: '',
  company: '',
  model: '',
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


function initCars() {
  for(i=1;i <= 4; i++){
    Cars[i] = Object.assign({}, Car)
  } 
  Cars[1].initCar('Porshe1', 'multicolor', '3.png', 'Porshe', '911 GT2 RS');
  Cars[2].initCar('Porshe2', 'white', '1.png', 'Porshe', '911 Carrera');
  Cars[3].initCar('Porshe3', 'green', '4.png', 'Porshe', '911 GT3');  
  Cars[4].initCar('Porshe4', 'brown', '2.png', 'Porshe', '911 GT3 RS');

  Cars.forEach(car => {
    let carPic = document.createElement('img');
    carPic.classList.add('carPic');
    carPic.setAttribute('src',`cars/${car.image}`)
    scrollParent.appendChild(carPic);
  });
}

initCars();
console.log(Cars);
