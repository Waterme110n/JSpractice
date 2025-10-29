let jsonTasks = '';
let Tasks = [];
<<<<<<< HEAD

function Task(name, desc, date, priority, project) {
  this.name = name,
    this.desc = desc,
    this.date = date,
    this.priority = priority,
    this.project = project
=======
let taskIdCounter = 0;

function Task(name, desc, date, priority, project) {
  this.id = taskIdCounter++;
  this.name = name;
  this.desc = desc;
  this.date = date;
  this.priority = priority;
  this.project = project;
>>>>>>> dev
}

function loadState() {
  const savedState = localStorage.getItem('Tasks');
<<<<<<< HEAD
  Tasks = savedState ? JSON.parse(savedState) : [];
=======
  const savedCounter = localStorage.getItem('taskIdCounter')
  Tasks = savedState ? JSON.parse(savedState) : [];
  if (Tasks.length > 0) {
    const maxId = Math.max(...Tasks.map(t => t.id || 0));
    taskIdCounter = maxId + 1;
  } else if (savedCounter) {
    taskIdCounter = parseInt(savedCounter);
  }
>>>>>>> dev
  console.log(Tasks);
}

function saveState(Tasks) {
  jsonTasks = JSON.stringify(Tasks);
  localStorage.setItem('Tasks', jsonTasks);
<<<<<<< HEAD
}


loadState()
=======
  localStorage.setItem('taskIdCounter', taskIdCounter)
}


loadState();
>>>>>>> dev

/*----------------------------------СreateTask---------------------------------------*/
const createTask = document.getElementById('createTask');
const dialogTask = document.getElementById('createWindowTask');
const dialogTaskCancelButton = document.querySelector('.cancel-btn');

const modalName = document.getElementById('taskName')
const modalDesc = document.getElementById('taskDesc')
const modalDate = document.getElementById('taskDate')
const modalPrior = document.getElementById('taskPriority')
const modalProj = document.getElementById('taskProjects')

<<<<<<< HEAD
let currentAction = -1;
=======
let currentAction = 0;
>>>>>>> dev

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
<<<<<<< HEAD
  event.preventDefault();
  if (currentAction == -1) {
    Tasks.push(new Task(modalName.value, modalDesc.value, modalDate.value, modalPrior.value, modalProj.value));
  } else {
    Tasks[currentAction] = new Task(modalName.value, modalDesc.value, modalDate.value, modalPrior.value, modalProj.value)
  }
=======
  let editableTask = Tasks.find(task => task.id == currentAction)
  event.preventDefault();
  if (currentAction == -1) {
    Tasks.push(new Task(modalName.value, modalDesc.value, modalDate.value, modalPrior.value, modalProj.value));
  } else if (editableTask) {
    editableTask.name = modalName.value;
    editableTask.desc = modalDesc.value;
    editableTask.date = modalDate.value;
    editableTask.priority = modalPrior.value;
    editableTask.project = modalProj.value;
  }

>>>>>>> dev
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
<<<<<<< HEAD
=======
    case 'Search': {
      initSearch();
      const taskSearch = document.querySelector('.taskSearch')
      taskSearch.value = insertText;
      searchTask(insertText);
    }
>>>>>>> dev
  }

  dialogTask.close();

})

/*----------------------------------All Task---------------------------------------*/
const allTaskButton = document.getElementById('allTask');
const main = document.querySelector('.main');
let where = '';
<<<<<<< HEAD
allTaskButton.addEventListener('click', showAllTasks);

function showAllTasks() {
=======

allTaskButton.addEventListener('click', () => {
  showAllTasks()
});

function showAllTasks(Taskes = Tasks) {
>>>>>>> dev
  where = 'Task';
  let divTasks = document.createElement('div');
  divTasks.classList.add('divTasks');
  main.innerHTML = '';
  main.appendChild(divTasks);
<<<<<<< HEAD
  if (Tasks.length == 0) {
    divTasks.innerHTML = 'Create Any Task'
  } else {
    divTasks.innerHTML = Tasks.map(task => `
      <div class="divTaskCard">
=======

  drawCards(Taskes, divTasks)
}

function drawCards(Taskes = Tasks, divTasks) {
  if (Taskes.length == 0) {
    divTasks.innerHTML = 'No tasks'
  } else {
    divTasks.innerHTML = Taskes.map(task => `
      <div class="divTaskCard" id="${task.id}">
>>>>>>> dev
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
<<<<<<< HEAD
  initButtons();
=======
  initTaskButtons(Taskes);
>>>>>>> dev
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

<<<<<<< HEAD
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

=======
function initTaskButtons(Taskes) {
  const edits = document.querySelectorAll('.divTaskEdit')

  edits.forEach((button, index) => {
    let editsPar = button.parentElement;
    let ButtonsPar = editsPar.parentElement;
    button.addEventListener('click', () => {
      dialogTask.showModal();
      modalName.value = Taskes[index].name;
      modalDesc.value = Taskes[index].desc;
      modalDate.value = Taskes[index].date;
      modalPrior.value = Taskes[index].priority;
      modalProj.value = Taskes[index].project;
      currentAction = ButtonsPar.id;
      console.log(currentAction)
>>>>>>> dev
    })
  });

  const deletes = document.querySelectorAll('.divTaskDel')
<<<<<<< HEAD
  deletes.forEach((button, index) => {
    button.addEventListener('click', () => {
      Tasks.splice(index, 1);
      saveState(Tasks);
      showAllTasks();
=======
  deletes.forEach((button) => {
    button.addEventListener('click', () => {
      let editsPar = button.parentElement;
      let ButtonsPar = editsPar.parentElement;
      let curInTrueArr = parseInt(ButtonsPar.id);
      Tasks = Tasks.filter(item => item.id !== curInTrueArr);
      saveState(Tasks);
      switch (where) {
        case 'Task': {
          showAllTasks();
          break;
        }
        case 'Search': {
          initSearch();
          const taskSearch = document.querySelector('.taskSearch')
          taskSearch.value = insertText;
          searchTask(insertText);
        }
      }
>>>>>>> dev
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
<<<<<<< HEAD
  console.log(where)
=======
>>>>>>> dev
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
<<<<<<< HEAD
  let numberTask = Tasks.indexOf(task);
=======
  let numberTask = task.id;
>>>>>>> dev
  calendarDays[positionCell].innerHTML += `
  <div class = 'calendarTaskInCell' id='${numberTask}task' style="background-color: ${ColorPriority(task.priority)}">
    <p class = 'nameTaskInCell'>${task.name}</p>
    <p class = 'descTaskInCell'>${task.desc}</p>
  </div>
  `

  let taskDivInCell = document.getElementById(`${numberTask}task`);
  taskDivInCell.addEventListener('click', () => {
    dialogTask.showModal();
<<<<<<< HEAD
    modalName.value = Tasks[numberTask].name;
    modalDesc.value = Tasks[numberTask].desc;
    modalDate.value = Tasks[numberTask].date;
    modalPrior.value = Tasks[numberTask].priority;
    modalProj.value = Tasks[numberTask].project;
    currentAction = numberTask;
=======
    curTask = Tasks.find(task => task.id == numberTask)
    console.log(curTask)
    modalName.value = curTask.name;
    modalDesc.value = curTask.desc;
    modalDate.value = curTask.date;
    modalPrior.value = curTask.priority;
    modalProj.value = curTask.project;
    currentAction = numberTask;
    console.log(currentAction)
>>>>>>> dev
  })

}

<<<<<<< HEAD


initCalendar();
//сделать по времени показ в какой клетке какая таска, при нажатии либо создавать новую изменять старую
//поиск
=======
/*----------------------------------Search---------------------------------------*/
const SearchButton = document.getElementById('searchTask');

SearchButton.addEventListener('click', () => {
  initSearch();
});

let queryDiv;

function initSearch() {
  where = 'Search';
  let search = document.createElement('div');
  search.classList.add('searchFlow');
  main.innerHTML = '';
  main.appendChild(search);
  search.innerHTML = `
    <div class="search-box">
      <input type="text" class="taskSearch" placeholder="Search something..." />
      <button class="dismissSearch"></button>
      <butoon class="acceptSearch"></button>
    </div>
    <div class = "resultQuery"></div>
    `;
  queryDiv = document.querySelector('.resultQuery');
  initSearchButtons();
}

let insertText = '';
function initSearchButtons() {
  const dismissSearch = document.querySelector('.dismissSearch');
  const taskSearch = document.querySelector('.taskSearch')
  dismissSearch.addEventListener('click', () => {
    taskSearch.value = '';
    queryDiv.innerHTML = '';

  })
  const acceptSearch = document.querySelector('.acceptSearch');
  acceptSearch.addEventListener('click', () => {
    insertText = taskSearch.value
    searchTask(insertText);
  })
}

function searchTask(query) {
  let queryArr = [];
  for (let task of Tasks) {
    for (let key in task) {
      if (task[key].toString().toLowerCase().includes(query.toLowerCase())) {
        !queryArr.includes(task) ? queryArr.push(task) : '';
        drawCards(queryArr, queryDiv)
      }
    }
  }
}

initSearch();

>>>>>>> dev
//листы загружать project в add из сущ проject
