const createTask = document.getElementById('createTask');
const dialogTask = document.getElementById('createWindowTask');
const dialogTaskOkButton = document.querySelector('.ok-btn');
const dialogTaskCancelButton = document.querySelector('.cancel-btn');
let jsonTasks = '';
let Tasks = [];

function Task(name, desc = undefined, date = undefined, priority = undefined, projects = []) {
  this.name = name,
    this.desc = desc,
    this.date = date,
    this.priority = priority,
    this.projects = projects
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
  Tasks.push(new Task(name, desc, date, prior, [proj]));
  saveState(Tasks);
  dialogTask.close();
})

loadState()