// Get html elements
var elFormTask = $_('.js-tasks__form')
var elInputTask = $_('.js-tasks__input')
var elTasksList = $_('.js-tasks__list')
var elTasksleft = $_('.js-tasks__left')
var elTaskTemplate = $_('#todo__item-template').content

// Create empty array for tasks
var tasksArr = []

// Create Tasks item
var createTasksItem = (arr) => {
	elTask = elTaskTemplate.cloneNode(true)

	$_('.tasks__text', elTask).textContent = arr.taskText
	$_('.js-remove-task-btn', elTask).dataset.Id = arr.id

	return elTask
}

// Render tasks to document
var renderTasks = (arr) => {
	elTasksList.innerHTML = ''

	var elTasksFragment = document.createDocumentFragment()

	arr.forEach((task) => {
		elTasksFragment.append(createTasksItem(task))
	})

	elTasksList.append(elTasksFragment)
}

// Listen submit of elFormTask
elFormTask.addEventListener('submit', (evt) => {
	evt.preventDefault()

	// Get value of inputTask
	var inputTask = elInputTask.value.trim()

	// Prevent empty value
	if (!inputTask) {
		alert('Please, enter text!')
		return
	}

	// Create and push task object
	tasksArr.push({
		id: 1,
		taskText: inputTask,
		completed: false,
	})

	// Add id to task object
	tasksArr.forEach((task, index) => {
		task.id = index + 1
	})

	renderTasks(tasksArr)

	// Little UI feature
	elInputTask.value = ''
	elInputTask.focus()
})

// Listen click of elTasksList to delete tasks
elTasksList.addEventListener('click', (evt) => {
	if (evt.target.matches('.js-remove-task-btn')) {
		// Delete element
		evt.target.closest('li').remove()

		// Find element form array and splice
		var foundTaskIndex = tasksArr.findIndex((task) => {
			return task.id === evt.target.dataset.id
		})

		tasksArr.splice(foundTaskIndex, 1)
	}
})
