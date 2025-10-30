let jsonTasks = '';
let Tasks = [];
let taskIdCounter = 0;

let jsonLists = '';
let Lists = [];
let listCounter = 0;

function Task(name, desc, date, priority, projects) {
  this.id = taskIdCounter++;
  this.name = name;
  this.desc = desc;
  this.date = date;
  this.priority = priority;
  this.projects = new Set(projects.map(id => Number(id)));
}

function loadState() {
  const savedTasks = localStorage.getItem('Tasks');
  const savedCounter = localStorage.getItem('taskIdCounter');

  if (savedTasks) {
    const parsed = JSON.parse(savedTasks);
    Tasks = parsed.map(t => ({
      ...t,
      projects: new Set(Array.isArray(t.projects) ? t.projects : [])
    }));
  } else {
    Tasks = [];
  }

  taskIdCounter = Tasks.length > 0
    ? Math.max(...Tasks.map(t => t.id || 0)) + 1
    : (savedCounter ? parseInt(savedCounter) : 0);

  const savedLists = localStorage.getItem('Lists');
  if (savedLists) {
    const parsed = JSON.parse(savedLists);
    Lists = parsed.map(l => ({
      ...l,
      tasksId: new Set(Array.isArray(l.tasksId) ? l.tasksId : [])
    }));
  } else {
    Lists = [];
  }

  listCounter = Lists.length > 0
    ? Math.max(...Lists.map(l => l.id || 0)) + 1
    : (localStorage.getItem('listCounter') ? parseInt(localStorage.getItem('listCounter')) : 0);

  insertListToleftPanel();
}

function saveStateTask(Tasks) {
  const tasksToSave = Tasks.map(task => ({
    ...task,
    projects: Array.from(task.projects)
  }));
  localStorage.setItem('Tasks', JSON.stringify(tasksToSave));
  localStorage.setItem('taskIdCounter', taskIdCounter);
}

function saveStateList(Lists) {
  const listsToSave = Lists.map(list => ({
    ...list,
    tasksId: Array.from(list.tasksId)
  }));
  localStorage.setItem('Lists', JSON.stringify(listsToSave));
  localStorage.setItem('listCounter', listCounter);
}

loadState();
//localStorage.clear()

/*----------------------------------СreateTask---------------------------------------*/
const createTask = document.getElementById('createTask');
const dialogTask = document.getElementById('createWindowTask');
const dialogTaskCancelButton = document.querySelector('.cancel-btn');

const modalName = document.getElementById('taskName')
const modalDesc = document.getElementById('taskDesc')
const modalDate = document.getElementById('taskDate')
const modalPrior = document.getElementById('taskPriority')
const modalProj = document.getElementById('taskProjects')

let currentAction = 0;

createTask.addEventListener('click', function () {
  modalName.value = '';
  modalDesc.value = '';
  modalDate.value = '';
  modalPrior.value = 'UnImportant';
  modalProj.innerHTML = Lists.map(list => `
  <label class="checkbox-label">
    <input type="checkbox" name="projects" value="project${list.id}">
    <span>${list.name}</span>
  </label> `).join('');
  currentAction = -1;
  dialogTask.showModal();
})

dialogTaskCancelButton.addEventListener('click', function () {
  dialogTask.close();
})

dialogTask.addEventListener('submit', function (event) {
  event.preventDefault();

  const checked = document.querySelectorAll('input[name="projects"]:checked');
  const checkedArr = Array.from(checked).map(input => Number(input.value.slice(7)));

  let newTask;

  if (currentAction === -1) {
    newTask = new Task(
      modalName.value,
      modalDesc.value,
      modalDate.value,
      modalPrior.value,
      checkedArr
    );
    Tasks.push(newTask);

    checkedArr.forEach(listId => {
      const list = Lists.find(l => l.id === listId);
      if (list && !list.tasksId.has(newTask.id)) {
        list.tasksId.add(newTask.id);
      }
    });
    saveStateList(Lists);

  } else {
    const editableTask = Tasks.find(t => t.id === currentAction);
    if (!editableTask) return;


    editableTask.name = modalName.value;
    editableTask.desc = modalDesc.value;
    editableTask.date = modalDate.value;
    editableTask.priority = modalPrior.value;
    editableTask.projects = checkedArr;


    const oldProjects = new Set(editableTask.projects);
    editableTask.projects = new Set(checkedArr);

    syncTaskWithLists(oldProjects, checkedArr, editableTask.id);
    saveStateList(Lists);
  }

  saveStateTask(Tasks);
  dialogTask.close();

  switch (where) {
    case 'Task': showAllTasks(); break;
    case 'Calendar': initCalendar(); break;
    case 'Search':
      initSearch();
      const searchInput = document.querySelector('.taskSearch');
      if (searchInput) searchInput.value = insertText;
      searchTask(insertText);
      break;
    default: showAllTasks();
  }
});

function syncTaskWithLists(oldProjectsSet, newProjectIdsArray, taskId) {
  Lists.forEach(list => {
    const wasInList = oldProjectsSet.has(list.id);
    const isInList = newProjectIdsArray.includes(list.id);

    if (wasInList && !isInList) {
      list.tasksId.delete(taskId); // ← .delete()
    }
    if (!wasInList && isInList && !list.tasksId.has(taskId)) {
      list.tasksId.add(taskId); // ← .add()
    }
  });
  saveStateList(Lists);
}
/*----------------------------------All Task---------------------------------------*/
const allTaskButton = document.getElementById('allTask');
const main = document.querySelector('.main');
let where = '';

allTaskButton.addEventListener('click', () => {
  showAllTasks()
});

function showAllTasks(Taskes = Tasks) {
  where = 'Task';
  let divTasks = document.createElement('div');
  divTasks.classList.add('divTasks');
  main.innerHTML = '';
  main.appendChild(divTasks);

  drawCards(Taskes, divTasks)
}

function drawCards(Taskes = Tasks, divTasks) {
  if (Taskes.length == 0) {
    divTasks.innerHTML = 'No tasks'
  } else {
    divTasks.innerHTML = Taskes.map(task => `
      <div class="divTaskCard" id="${task.id}">
        <h2>${task.name}</h2>
        <p class="divTaskDesc">${task.desc}</p>
        <p class="divTaskdate">${task.date.slice(0, 10)}</p>
        <p class="divTaskPrior" style="color : ${ColorPriority(task.priority)}">${task.priority}</p>
        <div class='divTaskProj'>
        ${Array.from(task.projects).length === 0 ?
        `<p class="divTaskProj">none projects</p>` :
        Array.from(task.projects).map(proj => {
          const list = Lists.find(el => el.id === proj);
          return `<p class="divTaskProj">${list?.name || '???'}</p>`;
        }).join('')
      }
        </div>
        <div class="TaskCardActions">
          <button class="divTaskEdit"></button>
          <button class="divTaskDel"></button>
        </div>
      </div>
    `
    ).join('')
  }
  initTaskButtons(Taskes);
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
      modalProj.innerHTML = Array.from(Taskes[index].projects).length === 0 ?
        `<p class="divTaskProj">None projects</p>` :
        Array.from(Taskes[index].projects).map(proj => {
          const list = Lists.find(el => el.id === proj);
          return `<p class="divTaskProj">${list?.name}</p>`;
        }).join('');
      currentAction = ButtonsPar.id;
    })
  });

  const deletes = document.querySelectorAll('.divTaskDel')
  deletes.forEach((button) => {
    button.addEventListener('click', () => {
      let editsPar = button.parentElement;
      let ButtonsPar = editsPar.parentElement;
      let curInTrueArr = parseInt(ButtonsPar.id);
      Tasks = Tasks.filter(item => item.id !== curInTrueArr);
      saveStateTask(Tasks);
      Lists.forEach(list => {
        if (list.tasksId.has(curInTrueArr)) {
          list.tasksId.delete(curInTrueArr);
        }
      });
      saveStateList(Lists);
      console.log(Lists)
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
  let calendarFlow = document.createElement('div');
  calendarFlow.classList.add('calendarFlow');
  main.innerHTML = '';
  main.appendChild(calendarFlow);
  calendarFlow.innerHTML = `
    <div class='calendarButtons'>
      <button class='prevWeek'>Previous week</button>
      <p class='currentWeek'></p>
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
  let numberTask = task.id;
  calendarDays[positionCell].innerHTML += `
  <div class = 'calendarTaskInCell' id='${numberTask}task' style="background-color: ${ColorPriority(task.priority)}">
    <p class = 'nameTaskInCell'>${task.name}</p>
    <p class = 'descTaskInCell'>${task.desc}</p>
  </div>
  `

  let taskDivInCell = document.getElementById(`${numberTask}task`);
  taskDivInCell.addEventListener('click', () => {
    dialogTask.showModal();
    curTask = Tasks.find(task => task.id == numberTask)
    modalName.value = curTask.name;
    modalDesc.value = curTask.desc;
    modalDate.value = curTask.date;
    modalPrior.value = curTask.priority;
    modalProj.innerHTML = curTask.projects.length == 0 ?
      `<p class="divTaskProj">None projects</p> `
      : curTask.projects.map(proj =>
        `<p class="divTaskProj">${Lists.find(el => el.id == Number(proj)).name}</p> `
      ).join('');
    currentAction = numberTask;
  })

}
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

/*----------------------------------Lists---------------------------------------*/

function List(name, tasksId = []) {
  this.id = listCounter++;
  this.name = name;
  this.tasksId = new Set(tasksId.map(id => Number(id)));
}


const addListButton = document.querySelector('.addList');
const dialogList = document.getElementById('createListWindow');
const dialogListCancelButton = document.querySelector('.cancelList');

const modalListName = document.getElementById('listName')
const modaListTasks = document.getElementById('ListProjects')

function openListDialog(listToEdit = null) {
  const isEditing = listToEdit !== null;
  const dialogTitle = dialogList.querySelector('h3') || document.createElement('h3');
  if (!dialogList.querySelector('h3')) dialogList.prepend(dialogTitle);


  dialogTitle.textContent = isEditing ? 'Edit list' : 'Create new list';
  modalListName.value = isEditing ? listToEdit.name : '';

  modaListTasks.innerHTML = Tasks.map(task => {
    const isChecked = isEditing && listToEdit.tasksId.has(task.id);
    return `
      <label class="checkbox-label">
        <input type="checkbox" name="projects" value="project${task.id}" ${isChecked ? 'checked' : ''} >
        <span>${task.name}</span>
      </label>
    `}).join('');

  dialogList.dataset.editingId = isEditing ? listToEdit.id : '';

  dialogList.showModal();
}

addListButton.addEventListener('click', () => {
  openListDialog();
});

dialogListCancelButton.addEventListener('click', () => {
  dialogList.close();
})

dialogList.addEventListener('submit', function (event) {
  event.preventDefault();

  const checked = document.querySelectorAll('input[name="projects"]:checked')
  const checkedArr = Array.from(checked).map(div =>
    Number(div.value.toString().slice(7))
  );

  const listName = modalListName.value.trim();
  const isEditing = dialogList.dataset.editingId !== '';
  let currentList;

  if (isEditing) {
    const listId = Number(dialogList.dataset.editingId);
    currentList = Lists.find(l => l.id == listId);
    if (!currentList) return;

    const oldTasksId = new Set(currentList.tasksId);
    currentList.name = listName;

    currentList.tasksId.clear();
    checkedArr.forEach(id => currentList.tasksId.add(id));

    updateTaskProjectsOnListEdit(oldTasksId, checkedArr, currentList.id);
    showList(currentList);

  } else {
    const newList = new List(listName, checkedArr.map(id => Number(id)));
    Lists.push(newList);
    currentList = newList;

    checkedArr.forEach(taskId => {
      const task = Tasks.find(t => t.id === taskId);
      if (task && !task.projects.has(newList.id)) {
        task.projects.add(newList.id);
      }
    });
    showList(currentList);
  }
  saveStateList(Lists);
  saveStateTask(Tasks);
  dialogList.close();
  insertListToleftPanel();
  delete dialogList.dataset.editingId;
})

function updateTaskProjectsOnListEdit(oldTasksIdSet, newTasksIdArray, listId) {
  Tasks.forEach(task => {
    const wasInList = oldTasksIdSet.has(task.id);
    const isInList = newTasksIdArray.includes(task.id);

    if (wasInList && !isInList) {
      task.projects.delete(listId);
    }
    if (!wasInList && isInList && !task.projects.has(listId)) {
      task.projects.add(listId);
    }
  });
}


function insertListToleftPanel() {
  const listOfLists = document.querySelector('.listsOfLists')
  listOfLists.innerHTML = Lists.map(list => `<li>
      <button class='listButton' id ='list${list.id}'>${list.name}</button>
      <div class= 'listGroupByttons'>
        <button class='divListEdit' id = 'divListEdit${list.id}'></button>
        <button class='divListDel' id = 'divListDel${list.id}'></button>
      </div>
    </li>
    `
  ).join('')

  Lists.forEach(list => {
    let clickedList = document.getElementById(`list${list.id}`)
    clickedList.addEventListener('click', () => {
      showList(list);
    })
  })

  Lists.forEach(list => {
    let editButtonList = document.getElementById(`divListEdit${list.id}`)
    editButtonList.addEventListener('click', () => {
      openListDialog(list);
    })
  })

  Lists.forEach(list => {
    let delButtonList = document.getElementById(`divListDel${list.id}`)
    delButtonList.addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm(`Удалить список "${list.name}"?`)) {
        deleteList(list.id);
      }
    })
  })
}

function deleteList(listId) {
  const listIdNum = Number(listId);

  Tasks.forEach(task => {
    task.projects.delete(listIdNum);
  });

  Lists = Lists.filter(list => list.id !== listIdNum);

  saveStateList(Lists);
  saveStateTask(Tasks);
  insertListToleftPanel();
  main.innerHTML = ''
}

function showList(List) {
  let divList = document.createElement('div');
  divList.classList.add('divList');
  main.innerHTML = '';
  main.appendChild(divList);
  let ListTasks = Array.from(List.tasksId)
    .map(id => Tasks.find(task => task.id === id))
    .filter(Boolean);

  divList.innerHTML = `
  <h3>${List.name}</h3>
  <div class='tasksInListDiv'>  
  </div>
  `

  const tasksInListDiv = document.querySelector('.tasksInListDiv');
  drawCards(ListTasks, tasksInListDiv)
}

