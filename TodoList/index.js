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

function returnState() {
  showAllTasks();
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
  returnState();
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
        <p class="divTaskdate">${task.date}</p>
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

showAllTasks();


function initButtons() {
  const Edits = document.querySelectorAll('.divTaskEdit')
  Edits.forEach((button, index) => {
    button.addEventListener('click', () => {
      dialogTask.showModal();
      document.getElementById('taskName').value = Tasks[index].name;
      document.getElementById('taskDesc').value = Tasks[index].desc;
      document.getElementById('taskDate').value = Tasks[index].date;
      document.getElementById('taskPriority').value = Tasks[index].priority;
      document.getElementById('taskProjects').value = Tasks[index].project;
      currentAction = index;

    })
  });
}









//загружать project в add из сущ проject
