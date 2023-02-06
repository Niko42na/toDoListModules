// оголошуємо змінні з якими будемо працювати

const form = document.querySelector('.create-task-form');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('.filter-input');
const clearBtn = document.querySelector('.clear-tasks');
const taskInput = document.querySelector('.task-input');

export {
    form,
    taskList,
    filter,
    clearBtn,
    taskInput
}