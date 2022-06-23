"use stick";
const task = document.querySelectorAll(".task");
const check = document.querySelectorAll(".check");
const btnCreateTask = document.querySelectorAll(".btnCreateTask");
const tasksDone = [];
const tasksPending = [];

function refreshLS() {
  localStorage.clear();
  location.reload();
}

function renderInfosLS() {
  const tasksDoneLS = JSON.parse(localStorage.getItem("tasksDone"));
  const tasksPendingLS = JSON.parse(localStorage.getItem("tasksPending"));

  if(tasksDoneLS == null || tasksPendingLS == null){
    return ''
  }else{
    tasksDoneLS.forEach(e => {
        const ul = document.querySelector('.ulDone')
        const task = document.createElement("div");
        task.className = "task";
        task.innerHTML = `<img class="disabled" src="assets/images/check.svg" alt="Check">
        <p>${e.title}</p>
        <img src="assets/images/trash.svg" alt="Lixeira">`;
        ul.appendChild(task);
      });
    
      tasksPendingLS.forEach(e => {
        const ul = document.querySelector('.ulPending')
        const task = document.createElement("div");
        task.className = "task";
        task.innerHTML = `<img class="disabled" src="assets/images/check.svg" alt="Check">
        <p>${e.title}</p>
        <img src="assets/images/trash.svg" alt="Lixeira">`;
        ul.appendChild(task);
      });
  }
}

task.forEach((t) => {
  t.addEventListener("mouseenter", (e) => {
    e.target.firstElementChild.classList.toggle("disabled");
  });

  t.addEventListener("mouseleave", (e) => {
    e.target.firstElementChild.classList.toggle("disabled");
  });

  t.addEventListener("click", (e) => {
    e.target.classList.toggle("checked");
  });
});

btnCreateTask.forEach((t) =>
  t.addEventListener("click", (e) => {
    const titleTask = prompt("Digite o titulo da tarefa:");

    function createTask(e, titleTask) {
      const ul = e.target.parentNode.previousElementSibling.firstElementChild;
      const task = document.createElement("div");
      task.className = "task";
      task.innerHTML = `<img class="disabled" src="assets/images/check.svg" alt="Check">
        <p>${titleTask}</p>
        <img src="assets/images/trash.svg" alt="Lixeira">`;
      ul.appendChild(task);
    }

    if (e.composedPath()[3].classList.contains("cardDone")) {
      let id = tasksDone.length;
      tasksDone.push({ title: titleTask, id: id });
    } else if (e.composedPath()[3].classList.contains("cardPending")) {
      let id = tasksPending.length;
      tasksPending.push({ title: titleTask, id: id });
    }

    let tasksDoneJson = JSON.stringify(tasksDone);
    let tasksPendingJson = JSON.stringify(tasksPending);

    localStorage.setItem("tasksDone", tasksDoneJson);
    localStorage.setItem("tasksPending", tasksPendingJson);

    console.log(tasksDone);
    console.log(tasksPending);

    createTask(e, titleTask);
  })
);

renderInfosLS()