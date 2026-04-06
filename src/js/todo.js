function getTodos() {
  // Get all todos from localStorage
  return JSON.parse(localStorage.getItem("todos")) || [];
}

function getTodoById(id) {
  // Find a todo by its id
  const todos = getTodos();
  return todos.find(todo => todo.id === id);
}

function saveTodos(todos) {
  // Save todos array to localStorage
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(data) {
  // Add a new todo
  const todos = getTodos();

  const newTodo = {
    id: Date.now(), // unique id based on timestamp
    ...data
  };

  todos.push(newTodo);
  saveTodos(todos); // save updated list
}

function deleteTodo(id) {
  // Delete a todo by id
  const todos = getTodos();
  const newTodos = todos.filter(todo => todo.id !== id);
  saveTodos(newTodos);
}

function updateTodo(id, updatedData) {
  // Update a todo by id
  const todos = getTodos();

  const updatedTodos = todos.map(todo => {
    if (todo.id === id) {
      return { ...todo, ...updatedData }; // merge updated data
    }
    return todo;
  });

  saveTodos(updatedTodos);
}

function toggleStatus(id) {
  // Toggle the status (completed/pending) of a todo
  const todo = getTodoById(id);
  if (!todo) return;

  updateTodo(id, { status: !todo.status });
}