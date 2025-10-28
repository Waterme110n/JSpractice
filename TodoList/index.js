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
    Tasks[currentAction] = new Task(modalName.value, modalDesc.value, modalDate.value, modalPrior.value, modalProj.value)
  }
  saveState(Tasks);

  switch (where) {
    case 'Task': {
      showAllTasks();
      break;
    }
    case 'Calendar': {
      initCalendar();
      break;
    }
  }

  dialogTask.close();

})

/*----------------------------------All Task---------------------------------------*/
const allTaskButton = document.getElementById('allTask');
const main = document.querySelector('.main');
let where = '';
allTaskButton.addEventListener('click', showAllTasks);

function showAllTasks() {
  where = 'Task';
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
        <p class="divTaskPrior" style="color : ${ColorPriority(task.priority)}">${task.priority}</p>
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
  let color = '#dfd3d3;'
  switch (priority) {
    case 'Very Important': {
      color = '#ce0000;';
      return color;
    }
    case 'Important': {
      color = '#792e2e;';
      return color;
    }
    case 'Common': {
      color = '#d6aaaa;';
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
let nextWeekButton = '';
let prevWeekButton = '';
let today = new Date();

CalendarButton.addEventListener('click', () => {
  initCalendar();
});

function initCalendar() {
  where = 'Calendar';
  console.log(where)
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
  nextWeekButton = document.querySelector('.nextWeek');
  prevWeekButton = document.querySelector('.prevWeek');
  AddWeekListeners(prevWeekButton, nextWeekButton);

  let calendar = document.querySelector('.calendarTask');
  addDateCalendar(calendar);
  addCellWithTime(calendar);

}

function addDateCalendar(calendar) {
  let week = daysInWeeks(today)
  calendar.innerHTML += `
    <div class="calendar-header"></div>`
  calendar.innerHTML += week.map(weekday => `
    <div class='calendar-header'>${weekday.day + ' ' + weekday.date}</div>
    `).join('')
}

let week = [];

function daysInWeeks(today) {
  const currentDate = new Date(today);
  const dayOfWeek = currentDate.getDay();
  const daysToMon = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  currentDate.setDate(currentDate.getDate() - daysToMon);

  week = [];
  let weekText = [];

  for (i = 0; i < 7; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + i);

    week.push({
      day: date.toString().slice(0, 3),
      date: date.toString().slice(8, 10),
      month: date.getMonth()
    })

    if (i == 0 || i == 6) {
      weekText.push(date.toString().slice(4, 10))
    }
  }

  let headWeek = document.querySelector('.currentWeek');
  headWeek.textContent = weekText.join(' - ');

  return week
}

function addCellWithTime(calendar) {
  let timeZone = [];
  for (i = 0; i < 192; i++) {
    if (i % 8 == 0) {
      timeZone.push(`${i / 8}:00`)
    } else {
      timeZone.push('')
    }
  }

  calendar.innerHTML += timeZone.map(time => `
    <div class="calendar-day">${time}</div>
    `).join('');

  insertIntoSells(timeZone);

}

function AddWeekListeners(prev, next) {
  prev.addEventListener('click', () => {
    today.setDate(today.getDate() - 7)
    initCalendar();
  });
  next.addEventListener('click', () => {
    today.setDate(today.getDate() + 7)
    initCalendar();
  })
}

function insertIntoSells(timeZone) {
  for (let task of Tasks) {
    let cell = {
      time: task.date.slice(11, 13),
      day: task.date.toString().slice(8, 10),
      month: task.date.toString().slice(5, 7)
    }
    let positionCell = 0;
    for (let dayWeek of week) {
      if (dayWeek.month + 1 == cell.month) {
        if (dayWeek.date == cell.day) {
          positionCell += week.indexOf(dayWeek) + 1;
          timeZone.forEach(item => {
            if (item.split(':')[0] == (cell.time[0] == 0 ? cell.time.slice(1, 2) : cell.time)) {
              positionCell += timeZone.indexOf(item);
              placeTaskIntoSell(task, positionCell)
            }
          })
        }
      }
    }
  }
}

function placeTaskIntoSell(task, positionCell) {
  let calendarDays = document.querySelectorAll('.calendar-day');
  let numberTask = Tasks.indexOf(task);
  calendarDays[positionCell].innerHTML += `
  <div class = 'calendarTaskInCell' id='${numberTask}task' style="background-color: ${ColorPriority(task.priority)}">
    <p class = 'nameTaskInCell'>${task.name}</p>
    <p class = 'descTaskInCell'>${task.desc}</p>
  </div>
  `

  let taskDivInCell = document.getElementById(`${numberTask}task`);
  taskDivInCell.addEventListener('click', () => {
    dialogTask.showModal();
    modalName.value = Tasks[numberTask].name;
    modalDesc.value = Tasks[numberTask].desc;
    modalDate.value = Tasks[numberTask].date;
    modalPrior.value = Tasks[numberTask].priority;
    modalProj.value = Tasks[numberTask].project;
    currentAction = numberTask;
  })

}



initCalendar();
//сделать по времени показ в какой клетке какая таска, при нажатии либо создавать новую изменять старую
//поиск
//листы загружать project в add из сущ проject
