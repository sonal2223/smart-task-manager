import {
    getTasks,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
    getTaskById,
    filterTasks,
    getTaskStats
} from "./tasks.js";

// Select HTML elements
const taskForm = document.querySelector("#taskForm");
const taskTitle = document.querySelector("#taskTitle");
const taskCategory = document.querySelector("#taskCategory");
const taskList = document.querySelector("#taskList");
const searchInput = document.querySelector("#searchInput");
const filterSelect = document.querySelector("#filterSelect");
const formTitle = document.querySelector("#formTitle");
const submitButton = document.querySelector("#submitButton");
const cancelEdit = document.querySelector("#cancelEdit");
const taskMessage = document.querySelector("#taskMessage");
const themeToggle = document.querySelector("#themeToggle");

// Track the task currently being edited
let editingTaskId = null;
let messageTimer;

// Display a status message
function showMessage(message) {
    taskMessage.textContent = message;

    clearTimeout(messageTimer);

    messageTimer = setTimeout(() => {
        taskMessage.textContent = "";
    }, 3000);
}

// Update task statistics
function renderStats() {
    const stats = getTaskStats();

    document.querySelector("#totalTasks").textContent = stats.total;
    document.querySelector("#pendingTasks").textContent = stats.pending;
    document.querySelector("#completedTasks").textContent = stats.completed;
}

// Create a task card safely using DOM methods
function createTaskCard(task) {
    const card = document.createElement("article");
    card.className = "task-card";

    if (task.completed) {
        card.classList.add("completed");
    }

    const info = document.createElement("div");
    info.className = "task-info";

    const title = document.createElement("h3");
    title.className = "task-title";
    title.textContent = task.title;

    const category = document.createElement("span");
    category.className = "task-category";
    category.textContent = task.category;

    const date = document.createElement("small");
    date.className = "task-date";

    const parsedDate = new Date(task.createdAt);

    date.textContent = Number.isNaN(parsedDate.getTime())
        ? "Date unavailable"
        : `Created: ${parsedDate.toLocaleDateString()}`;

    info.append(title, category, date);

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const completeButton = document.createElement("button");
    completeButton.type = "button";
    completeButton.className = "complete-button";
    completeButton.dataset.action = "toggle";
    completeButton.dataset.id = task.id;
    completeButton.textContent = task.completed
        ? "Undo"
        : "Complete";

    completeButton.setAttribute(
        "aria-label",
        `${task.completed ? "Mark as pending" : "Complete"}: ${task.title}`
    );

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "edit-button";
    editButton.dataset.action = "edit";
    editButton.dataset.id = task.id;
    editButton.textContent = "Edit";

    editButton.setAttribute(
        "aria-label",
        `Edit: ${task.title}`
    );

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.dataset.action = "delete";
    deleteButton.dataset.id = task.id;
    deleteButton.textContent = "Delete";

    deleteButton.setAttribute(
        "aria-label",
        `Delete: ${task.title}`
    );

    actions.append(completeButton, editButton, deleteButton);

    card.append(info, actions);

    return card;
}

// Render tasks according to search and filter settings
function renderTasks() {
    const visibleTasks = filterTasks(
        searchInput.value,
        filterSelect.value
    );

    taskList.replaceChildren();

    if (visibleTasks.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "empty-message";

        emptyMessage.textContent = getTasks().length === 0
            ? "No tasks yet. Add your first task!"
            : "No tasks match your search or filter.";

        taskList.appendChild(emptyMessage);
        return;
    }

    const fragment = document.createDocumentFragment();

    visibleTasks.forEach((task) => {
        fragment.appendChild(createTaskCard(task));
    });

    taskList.appendChild(fragment);
}

// Render the full application
function renderApp() {
    renderTasks();
    renderStats();
}

// Reset the form after adding or editing
function resetForm() {
    editingTaskId = null;

    taskForm.reset();

    formTitle.textContent = "Add New Task";
    submitButton.textContent = "Add Task";
    cancelEdit.hidden = true;
}

// Handle adding and updating tasks
taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = taskTitle.value.trim();
    const category = taskCategory.value;

    const result = editingTaskId
        ? updateTask(editingTaskId, title, category)
        : addTask(title, category);

    showMessage(result.message);

    if (!result.success) {
        return;
    }

    resetForm();
    renderApp();
});

// Handle task actions using event delegation
taskList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");

    if (!button || !taskList.contains(button)) {
        return;
    }

    const { action, id } = button.dataset;

    if (action === "toggle") {
        const result = toggleTask(id);

        showMessage(result.message);
        renderApp();
        return;
    }

    if (action === "edit") {
        const task = getTaskById(id);

        if (!task) {
            showMessage("Task not found.");
            renderApp();
            return;
        }

        editingTaskId = task.id;

        taskTitle.value = task.title;
        taskCategory.value = task.category;

        formTitle.textContent = "Edit Task";
        submitButton.textContent = "Update Task";
        cancelEdit.hidden = false;

        taskTitle.focus();

        return;
    }

    if (action === "delete") {
        const task = getTaskById(id);

        if (!task) {
            showMessage("Task not found.");
            renderApp();
            return;
        }

        const confirmed = window.confirm(
            `Are you sure you want to delete "${task.title}"?`
        );

        if (!confirmed) {
            return;
        }

        const result = deleteTask(id);

        if (editingTaskId === id) {
            resetForm();
        }

        showMessage(result.message);
        renderApp();
    }
});

// Cancel editing
cancelEdit.addEventListener("click", resetForm);

// Search tasks
searchInput.addEventListener("input", renderTasks);

// Filter tasks
filterSelect.addEventListener("change", renderTasks);

// Dark mode
themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");

    themeToggle.textContent = isDark
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";

    localStorage.setItem("smartTaskManagerTheme", isDark ? "dark" : "light");
});

// Restore the selected theme
function loadTheme() {
    try {
        const savedTheme = localStorage.getItem("smartTaskManagerTheme");

        const isDark = savedTheme === "dark";

        document.body.classList.toggle("dark", isDark);

        themeToggle.textContent = isDark
            ? "☀️ Light Mode"
            : "🌙 Dark Mode";
    } catch (error) {
        console.error("Could not load theme:", error);
    }
}

// Initialize the application
loadTheme();
renderApp();