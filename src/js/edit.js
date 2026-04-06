// Get the todo id from URL query string
function getTodoIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get("id"));
}

// Get form elements
const form = document.getElementById("addForm");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const prioritySelect = document.getElementById("priority");
const statusInput = document.getElementById("status");

// Get todo by id
const todoId = getTodoIdFromURL();
const todo = getTodoById(todoId);

// If todo not found, alert and redirect
if (!todo) {
  alert("Todo not found!");
  window.location.href = "index.html";
}

// Populate form with existing todo data
titleInput.value = todo.title;
descriptionInput.value = todo.description;
prioritySelect.value = todo.priority;
statusInput.checked = todo.status;

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent page reload

  // Create updated todo object
  const updatedTodo = {
    title: titleInput.value.trim(),
    description: descriptionInput.value.trim(),
    priority: prioritySelect.value,
    status: statusInput.checked
  };

  // Update todo in localStorage
  updateTodo(todoId, updatedTodo);

  // Redirect back to main page
  window.location.href = "index.html";
});