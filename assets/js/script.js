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
  // let ulCategoryTask = e.target.parentNode.parentNode
  // let title = e.target.textContent

  // if(ulCategoryTask.classList.contains('ulDone')){
  //   ulPending.append(createTask(title, false))
  //   const newPendingTasks = [...tasksPending, { title: title }];
  //   localStorage.setItem("tasksPending", JSON.stringify(newPendingTasks));
  //   // tasksDone.filter(e => {
  //   //   if(e.title == title){
  //   //     const indexTasksDone = tasksDone.indexOf(e)
  //   //     tasksDone.splice(indexTasksDone, (indexTasksDone + 1))
  //   //     saveOnLSBeforeDeleted(tasksDone, tasksPending)
  //   //     // renderTask(tasksDone, tasksPending)
  //   //     console.log(indexTasksDone)
  //   //   }
  //   // }) 
  // }else{
  //   console.log('pending')
  // }
  // console.log(title)
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
    <img class="delete" onclick="deleteTask(event)" src="assets/images/trash.svg">
    `;
    return li;
  }else{
    const li = document.createElement("li");
    li.setAttribute('onmouseenter', 'showCheck(event)')
    li.setAttribute('onmouseleave', 'showCheck(event)')
    li.setAttribute('onclick', 'markCheck(event)')
    li.innerHTML = `<img class="disabled" src="assets/images/check.svg">
    <p>${titleTask}</p>
    <img class="delete" onclick="deleteTask(event)" src="assets/images/trash.svg">
    `;
    return li;
  }
}

function renderTask(tasksDone, tasksPending) {
  tasksDone == null ? tasksDone = []: tasksDone = tasksDone;
  tasksPending == null ? tasksPending = []: tasksPending = tasksPending;

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
  const ulTask = e.target.parentNode.previousElementSibling.firstElementChild;

  if(ulTask.classList.contains("ulDone")) {
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
    saveOnLS(e, titleTask);
    getTasks()
    renderTask(tasksDone, tasksPending);
  }
}

function deleteTask(e){
  const taskCategory = e.target.parentNode.parentNode
  const titleTask = e.target.previousElementSibling.textContent
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