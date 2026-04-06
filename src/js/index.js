function renderTodos() {
  const todos = getTodos(); // Get all todos
  const tbody = document.getElementById("list");
  tbody.innerHTML = ""; // Clear previous list

  // Get search and filter values
  const searchText = document.getElementById("searchTitle").value.toLowerCase();
  const filterPriority = document.getElementById("filterPriority").value;
  const filterStatus = document.getElementById("filterStatus").value;

  // Filter todos based on search and filters
  const filteredTodos = todos.filter(todo => {
    const matchTitle = todo.title.toLowerCase().includes(searchText);
    const matchPriority = filterPriority ? todo.priority === filterPriority : true;
    const matchStatus = filterStatus ? (todo.status ? "Complete" : "Pending") === filterStatus : true;
    return matchTitle && matchPriority && matchStatus;
  });

  // Render filtered todos
  filteredTodos.forEach(todo => {
    const tr = document.createElement("tr");

    // Status checkbox
    const statusTd = document.createElement("td");
    statusTd.style.width = "5%";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.status;
    checkbox.addEventListener("change", () => {
      updateTodo(todo.id, { status: checkbox.checked }); // Update status
      renderTodos(); // Re-render after change
    });
    statusTd.appendChild(checkbox);
    tr.appendChild(statusTd);

    // Title column
    const titleTd = document.createElement("td");
    titleTd.style.width = "25%";
    titleTd.textContent = todo.title;
    tr.appendChild(titleTd);

    // Description column
    const descTd = document.createElement("td");
    descTd.style.width = "45%";
    descTd.textContent = todo.description;
    tr.appendChild(descTd);

    // Priority column
    const priorityTd = document.createElement("td");
    priorityTd.style.width = "10%";
    priorityTd.textContent = todo.priority;
    tr.appendChild(priorityTd);

    // Actions column (Edit & Delete)
    const actionsTd = document.createElement("td");
    actionsTd.style.width = "15%";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "btn btn-sm btn-primary me-2";
    editBtn.addEventListener("click", () => goEdit(todo.id)); // Go to edit page
    actionsTd.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "btn btn-sm btn-danger";
    deleteBtn.addEventListener("click", () => {
      if (confirm("Are you sure to delete this todo?")) {
        deleteTodo(todo.id); // Delete todo
        renderTodos(); // Re-render list
      }
    });
    actionsTd.appendChild(deleteBtn);

    tr.appendChild(actionsTd);
    tbody.appendChild(tr);
  });
}

// Navigate to edit page
function goEdit(id) {
  window.location.href = `edit.html?id=${id}`;
}

// Add button click
document.getElementById("addBtn").addEventListener("click", () => {
  window.location.href = "add.html";
});

// Bind search and filter events
document.getElementById("searchTitle").addEventListener("input", renderTodos);
document.getElementById("filterPriority").addEventListener("change", renderTodos);
document.getElementById("filterStatus").addEventListener("change", renderTodos);

// Initial render
renderTodos();