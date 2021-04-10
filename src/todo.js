// Todo object
function Todo(task, done) {
    this.task = task;
    this.done = done;
}

// Get the todo data from local storage if any
const getTodoData = () => {
    const todoData = JSON.parse(localStorage.getItem('todoData'));

    // If todo data are not empty, put the content on the array
    if (todoData !== null) {
        todoList = [...todoData];
    }
}

// Set the todo data to local storage
const setTodoData = () => {
    localStorage.setItem('todoData', JSON.stringify(todoList));
}

// Create a new todo entry and unshift it to array
const newTodo = (task, done = false) => {
    let newTodo = new Todo(task, done);
    todoList.unshift(newTodo);
}

// Save the changes from the list to the array
const updateArray = () => {
  // Get the ul content
  let parent = document.getElementById('list-group');

  // Get all the li content from ul
  let listItems = parent.getElementsByTagName("li");

  // Empty the array first
  todoList = [];

  // Loop thru all the li contents to get the task and the check values
  for (i = 0; i < listItems.length; i++) {
    
    // Get the task value
    let taskValue = listItems[i].innerHTML;

    // Go to the next two siblings to get the actual check icon value
    let check = listItems[i].nextElementSibling.nextElementSibling.firstElementChild.className;

    let checkValue = '';

    console.log(check);

    // Set true or false correspont the check icon
    check === 'far fa-check-square' ? checkValue = true : checkValue = false;

    console.log(checkValue);

    // Create a new todo object and add it to the array
    let newTodo = new Todo(taskValue, checkValue);
    todoList.push(newTodo);

    // Save the array to the local storage
    setTodoData();
  }
}

// Create the list on html
const createList = () => {
    // We use the div with class list
    let parent = document.getElementById('list-container');
    
    // Remove any previous content
    parent.innerHTML = '';

    // Create the ul tags
    let ul = document.createElement('ul');
    ul.id = 'list-group';
    parent.appendChild(ul);

    // For each item in array, create a row with the string
    // and the check, delete buttons on a li tag
    todoList.forEach((item) => {
      // Checked or unchecked icon correspont the boolean value in array
      let checkIcon = '';
      item.done ? checkIcon = 'fa-check-square' : checkIcon = 'fa-square';

      let content = `<div class= "row">
        <li class="list-group-item col-xs-4 col-sm-6 col-md-6">${item.task}</li>
        <button class="edit col-xs-2 col-sm-2 col-md-2 btn"><i class="fas fa-pencil-alt pen"></i></button>
        <button class="checked col-xs-2 col-sm-2 col-md-2 btn"><i class="far ${checkIcon}"></i></button>
        <button class="deleted col-xs-2 col-sm-2 col-md-2 btn"><i class="far fa-trash-alt"></i></button>
      </div>`;
      
      ul.innerHTML += content;
    });
}

// Get the value from input fielt, trim it and if it's not empty,
// add to the todo array and finaly reload the list
const getInput = (input) => {
    const task = input.value.trim();
    
    if (task !== '') {
        newTodo(task);
        createList();
        input.value = '';
        input.focus();
  }
}

// Create a submit event listener when the user
// press enter on the form input field
const todoForm = document.querySelector('.todoForm');
todoForm.addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('.todoInput');

  // Get the input field
  getInput(input);  
});

// Create a submit event listener when the user
// press enter on the submit button
const todoAddButton = document.querySelector('.addButton');
todoAddButton.addEventListener('click', event => {
  event.preventDefault();
  const input = document.querySelector('.todoInput');

  // Get the input field
  getInput(input);  
});


//Create a click event on the list and check what the user clicked on
const todoListClicked = document.querySelector('.todo-container');
todoListClicked.addEventListener('click', event => {
  event.preventDefault();
  
  // If the user clicked on edit button, get the actual text, prompt a window,
  // edit the string and update the list item with the edited string
  if (event.target.className === 'edit col-xs-2 col-sm-2 col-md-2 btn') {
    let actualTask = event.target.previousElementSibling.innerHTML;
    let editedTask = prompt('Edit the task', actualTask.trim());
    event.target.previousElementSibling.innerHTML = editedTask;
  }

  // If the user clicked on checked button, toggle the check icon
  if (event.target.className === 'checked col-xs-2 col-sm-2 col-md-2 btn') {
    let toggleCheckIcon = event.target.firstElementChild.className;
    
    // Toggle the check icon
    toggleCheckIcon === 'far fa-square' ? toggleCheckIcon = 'far fa-check-square' : toggleCheckIcon = 'far fa-square';

    // Update the check icon
    event.target.firstElementChild.className = toggleCheckIcon;
  }

  // if the user clicked on delete button, remove the li item from the list
  if (event.target.className === 'deleted col-xs-2 col-sm-2 col-md-2 btn') {
    let item = event.target.parentElement;
    item.remove();
  }

  // Finaly save the changes from the list to the array
  updateArray();
});

//--------------------------------------

// Array to keep all the todo entries
let todoList = [];

// Update the array (data from local storate or empty)
getTodoData();

// Create the list on html
createList();