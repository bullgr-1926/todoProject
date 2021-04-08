// Todo object
function Todo(task) {
    this.task = task;
    this.done = false;
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
const newTodo = (task) => {
    let newTodo = new Todo(task);
    todoList.unshift(newTodo);
}

// Create the list on html
const createList = () => {
    // We use the div with class list
    let parent = document.getElementById('list-container');
    
    // Remove any previous content
    parent.innerHTML = '';

    let ul = document.createElement('ul');
    parent.appendChild(ul);

    todoList.forEach((item) => {
      let li = document.createElement('li');
      ul.appendChild(li);
      li.innerHTML = item.task;
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

// Create submit event listener when the user
// press enter on the form input field
const todoForm = document.querySelector('.todoForm');
todoForm.addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('.todoInput');

  // Get the input field
  getInput(input);  
});

// Create submit event listener when the user
// press enter on the submit button
const todoAddButton = document.querySelector('.addButton');
todoAddButton.addEventListener('click', event => {
  event.preventDefault();
  const input = document.querySelector('.todoInput');

  // Get the input field
  getInput(input);  
});

//--------------------------------------

// Array to keep all the todo entries
let todoList = [];

// Update the array (data from local storate or empty)
getTodoData();

// Create the list on html
createList();




// Set the todo data in local storage (fires up by event)
//setTodoData();

// Create a new todo entry (fires up by event)
//newTodo("String from html input field");





// ---------------- Example entries ----------------
// Create a new todo entry
//newTodo("String from imput field");

// Delay to avoid get the same date
//for (let i = 0; i < 200; i++) {
//    console.log(i);
//}

//newTodo("Skata melata");

// Delay to avoid get the same date
//for (let i = 0; i < 200; i++) {
//    console.log(i);
//}

//newTodo("Arxidia kopanista");

//setTodoData();
// ---------------- Example entries ----------------

console.log(todoList);
