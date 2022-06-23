'use stick'
const task = document.querySelectorAll('.task')
const check = document.querySelectorAll('.check')

task.forEach(t => {
    t.addEventListener('mouseenter', e => {
            e.target.firstElementChild.classList.toggle('disabled')
    })

    t.addEventListener('mouseleave', e => {
            e.target.firstElementChild.classList.toggle('disabled')
    })

    t.addEventListener('click', e => {
        e.target.classList.toggle('checked')
    })
})