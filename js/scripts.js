// Create empty array for tasks
var tasksArr = JSON.parse(localStorage.getItem('tasks')) || []

// Increment index to set on localStorage
var taskLocalIndex = Number(localStorage.getItem('taskIndex'))

// Update storage to localStorage
var updateStorageLocal = () => {
   localStorage.setItem('tasks', JSON.stringify(tasksArr))
   localStorage.setItem('taskIndex', taskLocalIndex)
}


// Get html elements
var elFormTask = $_('.js-tasks__form')
var elInputTask = $_('.js-tasks__input')
var elTasksList = $_('.js-tasks__list')
var elTasksleft = $_('.js-tasks__left')
var elTaskTemplate = $_('#todo__item-template').content
var elTasksFilterBox = $_('.tasks__filter-btns-box')


// Create Tasks item
var createTasksItem = (task) => {
   elTask = elTaskTemplate.cloneNode(true)

   $_('.tasks__completed-checkbox', elTask).checked = task.completed
   $_('.tasks__completed-checkbox', elTask).dataset.todoId = task.id
   $_('.tasks__completed-checkbox', elTask).setAttribute('id', `todo${task.id}`)
   $_('.tasks__completed-label', elTask).setAttribute('for', `todo${task.id}`)
   $_('.tasks__text', elTask).textContent = task.taskText
   $_('.js-remove-task-btn', elTask).dataset.todoId = task.id



   if (task.completed) {
      $_('.tasks__text', elTask).classList.add('del')
   }

   return elTask
}


// Create and push task object
var createTasksToArray = (inputTask) => {

   tasksArr.push({
      id: ++taskLocalIndex,
      taskText: inputTask,
      completed: false
   })

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


// Tasks left function
var showTasksUndone = () => {

   var tasksUndone = tasksArr.filter(task => {
      return task.completed === false
   })

   elTasksleft.textContent = tasksUndone.length
}


// Create callback function to submit of elFormTask
var onElFormTaskSubmit = (evt) => {
   evt.preventDefault()

   // Get value of inputTask
   var inputTask = elInputTask.value.trim()

   // Prevent empty value
   if (!inputTask) {
      alert('Please, enter text!')
      return
   }


   createTasksToArray(inputTask)
   updateStorageLocal()
   renderTasks(tasksArr)


   // Little UI feature
   elInputTask.value = ''
   elInputTask.focus()

   showTasksUndone()

}


// Listen submit of elFormTask and assign callback function
elFormTask.addEventListener('submit', onElFormTaskSubmit)

// Render Tasks to show tasks sharply after reload
renderTasks(tasksArr)
updateStorageLocal()
showTasksUndone()



// Listen click of elTasksList to delete task
elTasksList.addEventListener('click', (evt) => {
   if (evt.target.matches('.js-remove-task-btn')) {

      // Delete element
      evt.target.closest('li').remove()

      // Find element form array and splice
      var foundTaskIndex = tasksArr.findIndex((task) => {
         return task.id === Number(evt.target.dataset.Id)
      })

      tasksArr.splice(foundTaskIndex, 1)

      updateStorageLocal()

   } else if (evt.target.matches('.tasks__completed-checkbox')) {

      // Assign target checkbox's id to new binding
      var taskDoneId = Number(evt.target.dataset.todoId)

      // Find when checkbox is checked
      if (evt.target.checked) {
         var taskDone = tasksArr.find(task => {
            return taskDoneId === task.id
         })

         // Assign it to vice verca when it checked
         taskDone.completed = !taskDone.completed
         updateStorageLocal()

      } else {
         var taskDone = tasksArr.find(task => {
            return taskDoneId === task.id
         })

         // Assign it to vice verca when it checked
         taskDone.completed = !taskDone.completed
         updateStorageLocal()
      }

      // Toggle class to task element
      evt.target.closest('div').nextElementSibling.classList.toggle('del')

      showTasksUndone()

   }
})


// Delege click event among btns of elTasksFilterBox
elTasksFilterBox.addEventListener('click', evt => {
   if (evt.target.matches('.js-tasks__filter-all')) {
      // Render all
      renderTasks(tasksArr)

   } else if (evt.target.matches('.js-tasks__filter-active')) {

      // Filter active tasks and render
      activeTasksArr = tasksArr.filter(task => {
         return task.completed === false
      })

      renderTasks(activeTasksArr)

   } else if (evt.target.matches('.js-tasks__filter-completed')) {

      // Filter done tasks and render
      doneTasksArr = tasksArr.filter(task => {
         return task.completed === true
      })

      renderTasks(doneTasksArr)

   } else if (evt.target.matches('.js-tasks__clear-completed')) {

      // Clear local storage and make everything empty
      updateStorageLocal()
      localStorage.clear()
      elTasksList.innerHTML = ''
   }


})