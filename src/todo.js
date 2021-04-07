// Todo object
function Todo(task) {
    this.id = Date.now();
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

// Create a new todo entry and push it to array
const newTodo = (task) => {
    let newTodo = new Todo(task);
    todoList.push(newTodo);
}

// Create the list on html
const createList = (items, parent) => {
    var ul = document.createElement('ul');
    parent.appendChild(ul);

    items.forEach((item) => {
      let li = document.createElement('li');
      ul.appendChild(li);
      li.innerHTML = item.task;
    });
}

// Array to keep all the todo entries
let todoList = [];

// Update the array (data from local storate or empty)
getTodoData();

// Send the array and parent name to create the list on html
createList(todoList, document.getElementById('list'));

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
// ---------------- Example entries ----------------

console.log(todoList);
console.log(todoList[0].id);
