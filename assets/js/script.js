"use stick";
const ulDone = document.querySelector(".ulDone");
const ulPending = document.querySelector(".ulPending");
const btnCreateTask = document.querySelectorAll(".btnCreateTask");
let tasksDone = JSON.parse(localStorage.getItem("tasksDone"));
let tasksPending = JSON.parse(localStorage.getItem("tasksPending")) 

const getTasks = () => {
  tasksDone = JSON.parse(localStorage.getItem("tasksDone"));
  tasksPending = JSON.parse(localStorage.getItem("tasksPending"))
  
  return {tasksDone, tasksPending}
}

function cleanLS() {
  localStorage.clear();
  location.reload();
}

function createTask(titleTask) {
  const li = document.createElement("li");
  li.innerHTML = `<p>${titleTask}</p>
  <img class="delete" onclick="deleteTask(event)" src="assets/images/trash.svg">
  `;
  return li;
}

function renderTask(tasksDone, tasksPending) {
  if (tasksDone == null) {
    tasksDone = [];
  }

  if (tasksPending == null) {
    tasksPending = [];
  }

  ulDone.innerHTML = "";
  ulPending.innerHTML = "";

  tasksDone.forEach((td) => {
    ulDone.append(createTask(td.title));
  });

  tasksPending.forEach((td) => {
    ulPending.append(createTask(td.title));
  });
}
renderTask(tasksDone, tasksPending);

function saveOnLS(e, titleTask) {
  const ulTask = e.target.parentNode.previousElementSibling.firstElementChild;

  if (ulTask.classList.contains("ulDone")) {
    const newDoneTasks = [...tasksDone, { title: titleTask }];
    localStorage.setItem("tasksDone", JSON.stringify(newDoneTasks));
  } else if (ulTask.classList.contains("ulPending")) {
    const newPendingTasks = [...tasksPending, { title: titleTask }];
    localStorage.setItem("tasksPending", JSON.stringify(newPendingTasks));
  }
}

function saveOnLSBeforeDeleted(tasksDone, tasksPending) {
  localStorage.setItem("tasksDone", JSON.stringify(tasksDone));
  localStorage.setItem("tasksPending", JSON.stringify(tasksPending));
}

function deleteTask(e){
  const taskCategory = e.target.parentNode.parentNode
  const titleTask = e.target.previousElementSibling.textContent
  console.log("🚀 ~ file: script.js ~ line 70 ~ deleteTask ~ titleTask", titleTask)
  if(taskCategory.classList.contains("ulDone")) {
    tasksDone.find(e => {
      if(e['title'] == titleTask){
        const indexTasksDone = tasksDone.indexOf(e)
        tasksDone.splice(indexTasksDone, (indexTasksDone + 1))
        saveOnLSBeforeDeleted(tasksDone, tasksPending)
        renderTask(tasksDone, tasksPending)
      }
    })
  } else {
    tasksPending.find(e => {
      if(e['title'] == titleTask){
        const indexTasksPending = tasksPending.indexOf(e)
        tasksPending.splice(indexTasksPending, (indexTasksPending + 1))
        saveOnLSBeforeDeleted(tasksDone, tasksPending)
        renderTask(tasksDone, tasksPending)
      }
    })
  }
}

btnCreateTask.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const titleTask = prompt("Digite o título da tarefa:");

    if (tasksDone == null) {
      tasksDone = [];
    }
  
    if (tasksPending == null) {
      tasksPending = [];
    }

    createTask(titleTask);
    saveOnLS(e, titleTask);
    getTasks()
    renderTask(tasksDone, tasksPending);
  });
});

