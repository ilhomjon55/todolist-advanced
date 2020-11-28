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

   return elTask
}


// Render tasks to document
var renderTasks = (arr) => {

   elTasksList.innerHTML = ''

   var elTasksFragment = document.createDocumentFragment()

   arr.forEach(task => {
      elTasksFragment.append(createTasksItem(task));
   })

   elTasksList.append(elTasksFragment)
}



elFormTask.addEventListener('submit', (evt) => {
   evt.preventDefault()


   var inputTask = elInputTask.value.trim()

   // Prevent empty value
   if (!inputTask) {
      alert('Please, enter text!')
      return
   }


   tasksArr.push({
      id: 1,
      taskText: inputTask,
      completed: false
   })

   tasksArr.forEach((task, index) => {
      task.id = index + 1
   })


   renderTasks(tasksArr)

   elInputTask.value = ''
   elInputTask.focus()
})