let jsonTasks = '';
let Tasks = [];

function Task(name, desc = undefined, date = undefined, priority = undefined, project) {
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

createTask.addEventListener('click', function () {
  dialogTask.showModal();
})

dialogTaskCancelButton.addEventListener('click', function () {
  dialogTask.close();
})

dialogTask.addEventListener('submit', function (event) {
  event.preventDefault();
  const name = document.getElementById('taskName').value;
  const desc = document.getElementById('taskDesc').value;
  const date = document.getElementById('taskDate').value;
  const prior = document.getElementById('taskPriority').value;
  const proj = document.getElementById('taskProjects').value;
  Tasks.push(new Task(name, desc, date, prior, proj));
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

}

function ColorPriority(priority) {
  let color = 'color : #dfd3d3;'
  switch (priority) {
    case 'veryImportant': {
      color = 'color : #810606;';
      return color;
      break;
    }
    case 'important': {
      color = 'color : #792e2e;';
      return color;
      break;
    }
    case 'common': {
      color = 'color : #d6aaaa;';
      return color;
      break;
    }
    case 'unImportant': {
      return color;
      break;
    }
  }
}


showAllTasks() 
//загружать project в add из сущ проject