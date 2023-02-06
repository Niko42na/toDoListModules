import {    
	loadTasks, 
    createTask, 
	removeTask,
	removeAllTasks,
    filterItems
} from "./functions.js";

import {
	form,
    taskList,
    filter,
    clearBtn,
} from './constants.js';


// додаємо функції для обробників подій
document.addEventListener('DOMContentLoaded', loadTasks);
form.addEventListener('submit', createTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', removeAllTasks);
filter.addEventListener('keyup', filterItems);
