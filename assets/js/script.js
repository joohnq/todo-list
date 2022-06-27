"use stick";
const ulDone = document.querySelector(".ulDone");
const ulPending = document.querySelector(".ulPending");
const btnCreateTask = document.querySelectorAll(".btnCreateTask");
let tasksDone;
let tasksPending;

function getTask() {
  tasksDone = JSON.parse(localStorage.getItem("tasksDone"));
  tasksPending = JSON.parse(localStorage.getItem("tasksPending")) 
  if (tasksDone == null) {
    tasksDone = [];
  }

  if (tasksPending == null) {
    tasksPending = [];
  }
}
getTask()

function createTask(titleTask) {
  const li = document.createElement("li");
  li.innerHTML = `${titleTask}
  <img class="delete" onclick="deleteTask()" src="assets/images/trash.svg">
  `;
  return li;
}

function cleanLS() {
  localStorage.clear();
  location.reload();
}

function renderTask() {
  getTask();
  ulDone.innerHTML = "";
  ulPending.innerHTML = "";

  tasksDone.forEach((td) => {
    ulDone.append(createTask(td.title));
  });

  tasksPending.forEach((td) => {
    ulPending.append(createTask(td.title));
  });
}
renderTask();

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

function deleteTask(){
  console.log('deletado')
}

btnCreateTask.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const titleTask = prompt("Digite o título da tarefa:");
    createTask(titleTask);
    saveOnLS(e, titleTask);
    renderTask();
  });
});

