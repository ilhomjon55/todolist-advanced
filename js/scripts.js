// Create empty array for tasks
var tasksArr = []


// Increment index to set on localStorage
var taskLocalIndex = Number(localStorage.getItem('taskIndex'))

// Update taskLocalIndex to localStorage
var updateTaskLocalIndex = () => {
   localStorage.setItem('taskIndex', taskLocalIndex)
}
// localStorage.clear()


// Get html elements
var elFormTask = $_('.js-tasks__form')
var elInputTask = $_('.js-tasks__input')
var elTasksList = $_('.js-tasks__list')
var elTasksleft = $_('.js-tasks__left')
var elsCheckCompleted = $$_('.tasks__completed-checkbox')
var elTaskTemplate = $_('#todo__item-template').content


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
   renderTasks(tasksArr)
   updateTaskLocalIndex()
   console.log(tasksArr)


   // Little UI feature
   elInputTask.value = ''
   elInputTask.focus()


}


// Listen submit of elFormTask and assign callback function
elFormTask.addEventListener('submit', onElFormTaskSubmit)


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
      updateTaskLocalIndex()

   } else if (evt.target.matches('.tasks__completed-checkbox')) {

      var idOfCopletedTask = Number(evt.target.dataset.todoId)

      if (evt.target.checked) {
         var completedTask = tasksArr.find(task => {
            return idOfCopletedTask === task.id
         })

         completedTask.completed = !completedTask.completed
         updateTaskLocalIndex()
      }

      evt.target.closest('div').nextElementSibling.classList.toggle('del')
   }
})