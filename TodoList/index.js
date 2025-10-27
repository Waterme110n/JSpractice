let jsonTasks = '';
let Tasks = [];

function Task(name, desc, date, priority, project) {
  this.name = name,
    this.desc = desc,
    this.date = date,
    this.priority = priority,
    this.project = project
}

function loadState() {
  const savedState = localStorage.getItem('Tasks');
  Tasks = savedState ? JSON.parse(savedState) : [];
  console.log(Tasks);
}

function saveState(Tasks) {
  jsonTasks = JSON.stringify(Tasks);
  localStorage.setItem('Tasks', jsonTasks);
}


loadState()

/*----------------------------------СreateTask---------------------------------------*/
const createTask = document.getElementById('createTask');
const dialogTask = document.getElementById('createWindowTask');
const dialogTaskCancelButton = document.querySelector('.cancel-btn');

const modalName = document.getElementById('taskName')
const modalDesc = document.getElementById('taskDesc')
const modalDate = document.getElementById('taskDate')
const modalPrior = document.getElementById('taskPriority')
const modalProj = document.getElementById('taskProjects')

let currentAction = -1;

createTask.addEventListener('click', function () {
  modalName.value = '';
  modalDesc.value = '';
  modalDate.value = '';
  modalPrior.value = 'UnImportant';
  modalProj.value = '';
  currentAction = -1;
  dialogTask.showModal();
})

dialogTaskCancelButton.addEventListener('click', function () {
  dialogTask.close();
})

dialogTask.addEventListener('submit', function (event) {
  event.preventDefault();
  if (currentAction == -1) {
    Tasks.push(new Task(modalName.value, modalDesc.value, modalDate.value, modalPrior.value, modalProj.value));
  } else {
    Tasks[currentAction] = new Task()
  }
  saveState(Tasks);
  showAllTasks();
  dialogTask.close();

})

/*----------------------------------All Task---------------------------------------*/
const allTaskButton = document.getElementById('allTask');
const main = document.querySelector('.main');

allTaskButton.addEventListener('click', showAllTasks);

function showAllTasks() {
  let divTasks = document.createElement('div');
  divTasks.classList.add('divTasks');
  main.innerHTML = '';
  main.appendChild(divTasks);
  if (Tasks.length == 0) {
    divTasks.innerHTML = 'Create Any Task'
  } else {
    divTasks.innerHTML = Tasks.map(task => `
      <div class="divTaskCard">
        <h2>${task.name}</h2>
        <p class="divTaskDesc">${task.desc}</p>
        <p class="divTaskdate">${task.date.slice(0, 10)}</p>
        <p class="divTaskPrior" style="${ColorPriority(task.priority)}">${task.priority}</p>
        <p class="divTaskProj">${task.project}</p>
        <div class="TaskCardActions">
          <button class="divTaskEdit"></button>
          <button class="divTaskDel"></button>
        </div>
      </div>
    `
    ).join('')
  }
  initButtons();
}

function ColorPriority(priority) {
  let color = 'color : #dfd3d3;'
  switch (priority) {
    case 'Very Important': {
      color = 'color : #ce0000;';
      return color;
    }
    case 'Important': {
      color = 'color : #792e2e;';
      return color;
    }
    case 'Common': {
      color = 'color : #d6aaaa;';
      return color;
    }
    case 'UnImportant': {
      return color;
    }
  }
}

function initButtons() {
  const edits = document.querySelectorAll('.divTaskEdit')
  edits.forEach((button, index) => {
    button.addEventListener('click', () => {
      dialogTask.showModal();
      modalName.value = Tasks[index].name;
      modalDesc.value = Tasks[index].desc;
      modalDate.value = Tasks[index].date;
      modalPrior.value = Tasks[index].priority;
      modalProj.value = Tasks[index].project;
      currentAction = index;
    })
  });

  const deletes = document.querySelectorAll('.divTaskDel')
  deletes.forEach((button, index) => {
    button.addEventListener('click', () => {
      Tasks.splice(index, 1);
      saveState(Tasks);
      showAllTasks();
    })
  });
}

/*----------------------------------Calendar---------------------------------------*/
const CalendarButton = document.getElementById('CalendarTask');

CalendarButton.addEventListener('click', initCalendar);

function initCalendar() {
  let calendarFlow = document.createElement('div');
  calendarFlow.classList.add('calendarFlow');
  main.innerHTML = '';
  main.appendChild(calendarFlow);
  calendarFlow.innerHTML = `
    <div class='calendarButtons'>
      <button class='prevWeek'>Previous week</button>
      <p class='currentWeek'>12123</p>
      <button class='nextWeek'>Next week</button>
    </div>
    <div class='calendarTask'></div>
    `;
  let calendar = document.querySelector('.calendarTask')
  let timeZone = [];
  for (i = 0; i < 192; i++) {
    if (i % 8 == 0) {
      timeZone.push(`${i / 8}:00`)
    } else {
      timeZone.push('')
    }
  }
  calendar.innerHTML = `
    <div class="calendar-header"></div>
    <div class="calendar-header">Пн</div>
    <div class="calendar-header">Вт</div>
    <div class="calendar-header">Ср</div>
    <div class="calendar-header">Чт</div>
    <div class="calendar-header">Пт</div>
    <div class="calendar-header">Сб</div>
    <div class="calendar-header">Вс</div>`
  calendar.innerHTML += timeZone.map(time => `
    <div class="calendar-day">${time}</div>
    `).join('');
}





initCalendar()
//загружать project в add из сущ проject

//сделать слева время в строке, сверху дату

/*
      <div class="calendar-header"></div>
      <div class="calendar-header">Пн</div>
      <div class="calendar-header">Вт</div>
      <div class="calendar-header">Ср</div>
      <div class="calendar-header">Чт</div>
      <div class="calendar-header">Пт</div>
      <div class="calendar-header">Сб</div>
      <div class="calendar-header">Вс</div>*/