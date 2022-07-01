"use stick";
const ulDone = document.querySelector(".ulDone");
const ulPending = document.querySelector(".ulPending");
const btnCreateTask = document.querySelectorAll(".btnCreateTask");
let tasksDone = JSON.parse(localStorage.getItem("tasksDone"));
let tasksPending = JSON.parse(localStorage.getItem("tasksPending")) 

function getTasks(){
  tasksDone = JSON.parse(localStorage.getItem("tasksDone"));
  tasksPending = JSON.parse(localStorage.getItem("tasksPending"))
  
  return {tasksDone, tasksPending}
}

function cleanLS(){
  localStorage.clear();
  location.reload();
}

function showCheck(e){
  e.target.firstElementChild.classList.toggle('disabled')
}

function markCheck(e){
  e.composedPath()[1].classList.toggle('checked')
}

function createTask(titleTask, done) {
  if(done == true){
    const li = document.createElement("li");
    li.className = 'checked'
    li.setAttribute('onmouseenter', 'showCheck(event)')
    li.setAttribute('onmouseleave', 'showCheck(event)')
    li.setAttribute('onclick', 'markCheck(event)')
    li.innerHTML = `<img class="disabled" src="assets/images/check.svg">
    <p>${titleTask}</p>
    <div>
    <img onclick="changeTaskTitle(event)" src="assets/images/edit.svg"><img onclick="deleteTask(event)" src="assets/images/trash.svg">
    </div>
    `;
    return li;
  }else{
    const li = document.createElement("li");
    li.setAttribute('onmouseenter', 'showCheck(event)')
    li.setAttribute('onmouseleave', 'showCheck(event)')
    li.setAttribute('onclick', 'markCheck(event)')
    li.innerHTML = `<img class="disabled" src="assets/images/check.svg">
    <p>${titleTask}</p>
    <div>
    <img onclick="changeTaskTitle(event)" src="assets/images/edit.svg"><img onclick="deleteTask(event)" src="assets/images/trash.svg">
    </div>
    `;
    return li;
  }
}

function changeTaskTitle(e){
  const ulCategoryTask = e.target.parentNode.parentNode.parentNode
  const titleTaskOld = e.target.parentNode.previousElementSibling.textContent
  const titleTaskNew = prompt('Digite o novo titulo da tarefa:')
  if(ulCategoryTask.classList.contains('ulDone')){
    tasksDone.filter(t => {
      if(t.title == titleTaskOld){
        t.title = titleTaskNew
        saveOnLSBeforeDeleted(tasksDone, tasksPending)
        renderTask(tasksDone, tasksPending)
      }
    })
  }else{
    tasksPending.filter(t => {
      if(t.title == titleTaskOld){
        t.title = titleTaskNew
        saveOnLSBeforeDeleted(tasksDone, tasksPending)
        renderTask(tasksDone, tasksPending)
      }
    })
  }

}

function renderTask(tasksDone, tasksPending) {
  if(tasksDone == null){
    tasksDone = []
  }

  if(tasksPending == null){
    tasksPending = []
  }

  ulDone.innerHTML = "";
  ulPending.innerHTML = "";

  tasksDone.forEach(td => {
    ulDone.append(createTask(td.title, true));
  });

  tasksPending.forEach(tp => {
    ulPending.append(createTask(tp.title, false));
  });
}
renderTask(tasksDone, tasksPending);

function saveOnLS(e, titleTask) {
  if(e.classList.contains("ulDone")) {
    const newDoneTasks = [...tasksDone, { title: titleTask}];
    localStorage.setItem("tasksDone", JSON.stringify(newDoneTasks));
  }else{
    const newPendingTasks = [...tasksPending, { title: titleTask}];
    localStorage.setItem("tasksPending", JSON.stringify(newPendingTasks));
  }
}

function saveOnLSBeforeDeleted(tasksDone, tasksPending) {
  localStorage.setItem("tasksDone", JSON.stringify(tasksDone));
  localStorage.setItem("tasksPending", JSON.stringify(tasksPending));
}

function createElement(e) {
  const titleTask = prompt('Digite o título da tarefa:')
  if(titleTask == null || titleTask == ''){
    createElement(e)
  }else{
    tasksDone == null ? tasksDone = []: tasksDone = tasksDone;
    tasksPending == null ? tasksPending = []: tasksPending = tasksPending;
    saveOnLS(e.target.parentNode.previousElementSibling.firstElementChild, titleTask);
    getTasks()
    renderTask(tasksDone, tasksPending);
  }
}

function deleteTask(e){
  const taskCategory = e.target.parentNode.parentNode.parentNode
  const titleTask = e.target.parentNode.previousElementSibling.textContent
  if(taskCategory.classList.contains("ulDone")) {
    tasksDone.filter(e => {
      if(e.title == titleTask){
        const indexTasksDone = tasksDone.indexOf(e)
        tasksDone.splice(indexTasksDone, (indexTasksDone + 1))
        saveOnLSBeforeDeleted(tasksDone, tasksPending)
        renderTask(tasksDone, tasksPending)
      }
    })
  } else {
    tasksPending.filter(e => {
      if(e.title == titleTask){
        const indexTasksPending = tasksPending.indexOf(e)
        tasksPending.splice(indexTasksPending, (indexTasksPending + 1))
        saveOnLSBeforeDeleted(tasksDone, tasksPending)
        renderTask(tasksDone, tasksPending)
      }
    })
  }
}

btnCreateTask.forEach(btn => {
  btn.addEventListener("click", (e) => {
    createElement(e)
  });
});