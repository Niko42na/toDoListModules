import {
    taskList,
    taskInput
} from './constants.js';

function loadTasks() {
	// оголошуємо змінну яка буде використовуватись для списку завдань
	let tasks;

	// перевіряємо чи є у ЛокалСтораджі вже які данні завдань
	if(localStorage.getItem('tasks') !== null) {
		// якщо вони там є - витягуємо їх і присвоюємо змінній
		tasks = JSON.parse(localStorage.getItem('tasks'));
	} else {
		// якщо їх там нема - присвоюємо змінній значення порожнього масиву
		tasks = [];
	}

	// для кожної задачі яка є
	tasks.forEach(function(task) {
		// створюємо елемент списку
		const li = document.createElement('li');
		// додаємо йому класс
		li.className = 'colection-item';
		// всередині цього елементу списку створюємо текстову ноду з описом завдання
		li.appendChild(document.createTextNode(task));

		const deleteElement = document.createElement('span');
		deleteElement.className = 'delete-item';
		deleteElement.innerHTML = '<i class="fa fa-remove"></i>';
		li.appendChild(deleteElement);

		// запихуємо цей елемент списку в список
		taskList.appendChild(li);
	})
}

function createTask(event) {

	// якщо значення в інпуті порожнє  - то не додаємо нове завдання і не даємо виконатись дефолтній поведінці
	if(taskInput.value.trim() === '') {
		event.preventDefault();
		return null;
	}

	// створюємо елемент списку
	const li = document.createElement('li');
	// додаємо йому класс
	li.className = 'colection-item';
	// всередині цього елементу списку створюємо текстову ноду з описом завдання
	li.appendChild(document.createTextNode(taskInput.value));

	const deleteElement = document.createElement('span');
	deleteElement.className = 'delete-item';
	deleteElement.innerHTML = '<i class="fa fa-remove"></i>';
	li.appendChild(deleteElement);

	// запихуємо цей елемент списку в список
	taskList.appendChild(li);

	
	// викликаємо функцію яка буде додавати завдання до ЛокалСтораджа
	storeTaskInLocalStorage(taskInput.value);

	// очищуємо вміст інпуту для створення завдання
	taskInput.value = '';

	// блокуємо дефолтну поведінку сабміта
	event.preventDefault();
}

function storeTaskInLocalStorage(task) {
	// оголошуємо змінну яка буде використовуватись для списку завдань
	let tasks;

	// перевіряємо чи є у ЛокалСтораджі вже які данні завдань
	if(localStorage.getItem('tasks') !== null) {
		// якщо вони там є - витягуємо їх і присвоюємо змінній
		tasks = JSON.parse(localStorage.getItem('tasks'));
	} else {
		// якщо їх там нема - присвоюємо змінній значення порожнього масиву
		tasks = [];
	}

	// додаємо до списку нове завдання
	tasks.push(task);

	// зберігаємо список завданнь в ЛокалСТорадж
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// видалити якусь конкретну таску
function removeTask(event) {
	let iconContainter = event.target.parentElement;
	// якщо ми клікнули по хрестику  - тоді
	if(iconContainter.classList.contains('delete-item')) {  
		// пересвідчемось чи юзер справді хоче видалити цей елемент
		if(confirm('Ви впевнені що хочете видали саме це завдання?')){
			// видаляємо цей елемент списку, в якому знаходиться хрестик
			iconContainter.parentElement.remove();
			// викликаємо функцію яка буде видаляти завдання з ЛокалСтораджа
			removeTaskFromLocalStorage(iconContainter.parentElement);
		}
	}
}

function removeTaskFromLocalStorage(taskItemAsHTMLElement) {
	// оголошуємо змінну яка буде використовуватись для списку завдань
	let tasks;

	// перевіряємо чи є у ЛокалСтораджі вже які данні завдань
	if(localStorage.getItem('tasks') !== null) {
		// якщо вони там є - витягуємо їх і присвоюємо змінній
		tasks = JSON.parse(localStorage.getItem('tasks'));
	} else {
		// якщо їх там нема - присвоюємо змінній значення порожнього масиву
		tasks = [];
	}

	tasks.forEach(function(task, index) {
		if(taskItemAsHTMLElement.textContent === task) {
			tasks.splice(index, 1);
		}
	})

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// видалити всі таски
function removeAllTasks() {
	if(confirm('Ви впевнені що хочете видали всі завдання?')){
		// видаляємо весь контент всередині списку
		taskList.innerHTML = '';
		// видалити всі елементи з ЛокалСтораджа
		removeAllTasksFromLocalStorage();
	}
}

function removeAllTasksFromLocalStorage() {
	// 
	localStorage.clear();
}

function filterItems(event) {
	// оголосимо змінну яка буде в себе приймати значення по якому юзер фільтрує
	const filterQuery = event.target.value.toLowerCase();
	// знайти всі елементи завдань на сторінці
	document.querySelectorAll('.colection-item').forEach(function(taskHTMLElement){
		// знаходимо текст всередині li
		const taskText = taskHTMLElement.firstChild.textContent.toLowerCase();
		// якщо пошукова строка є в складі тексту з ls
		if(taskText.includes(filterQuery)) {
			// показуємо цей елемент списку
			taskHTMLElement.style.display = 'block';
		} else { // якщо немає
			// не показуємо цей елемент списку
			taskHTMLElement.style.display = 'none';
		}
	})
}

export {
    loadTasks, 
    createTask, 
    storeTaskInLocalStorage, 
    removeTaskFromLocalStorage,
    removeTask,
    removeAllTasks,
    removeAllTasksFromLocalStorage,
    filterItems
}