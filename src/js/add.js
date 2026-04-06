// Get form and input elements
const addForm = document.getElementById("addForm");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const prioritySelect = document.getElementById("priority");

// Handle form submission
addForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent page reload

  // Create new todo object
  const newTodo = {
    title: titleInput.value.trim(),
    description: descriptionInput.value.trim(),
    priority: prioritySelect.value,
    status: false // default status is not completed
  };

  // Add todo to localStorage
  addTodo(newTodo);

  // Redirect to main page
  window.location.href = "index.html";
});