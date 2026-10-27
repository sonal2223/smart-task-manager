import { loadTasks, saveTasks } from "./storage.js";

let tasks = loadTasks();

const categories = ["Personal", "Work", "Study", "Other"];

export function getTasks() {
    return [...tasks];
}

export function addTask(title, category) {
    const cleanTitle = title.trim();

    if (!cleanTitle) {
        return {
            success: false,
            message: "Please enter a task title."
        };
    }

    if (!categories.includes(category)) {
        return {
            success: false,
            message: "Please select a valid category."
        };
    }

    const newTask = {
        id: crypto.randomUUID(),
        title: cleanTitle,
        category,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks = [...tasks, newTask];

    return persistTasks("Task added successfully.");
}

export function updateTask(id, title, category) {
    const cleanTitle = title.trim();

    if (!cleanTitle) {
        return {
            success: false,
            message: "Please enter a task title."
        };
    }

    if (!categories.includes(category)) {
        return {
            success: false,
            message: "Please select a valid category."
        };
    }

    const exists = tasks.some((task) => task.id === id);

    if (!exists) {
        return {
            success: false,
            message: "Task not found."
        };
    }

    tasks = tasks.map((task) =>
        task.id === id
            ? { ...task, title: cleanTitle, category }
            : task
    );

    return persistTasks("Task updated successfully.");
}

export function toggleTask(id) {
    const exists = tasks.some((task) => task.id === id);

    if (!exists) {
        return {
            success: false,
            message: "Task not found."
        };
    }

    tasks = tasks.map((task) =>
        task.id === id
            ? { ...task, completed: !task.completed }
            : task
    );

    return persistTasks("Task status updated.");
}

export function deleteTask(id) {
    const exists = tasks.some((task) => task.id === id);

    if (!exists) {
        return {
            success: false,
            message: "Task not found."
        };
    }

    tasks = tasks.filter((task) => task.id !== id);

    return persistTasks("Task deleted successfully.");
}

export function getTaskById(id) {
    return tasks.find((task) => task.id === id) ?? null;
}

export function filterTasks(searchText = "", filter = "all") {
    const query = searchText.trim().toLowerCase();

    return tasks.filter((task) => {
        const matchesSearch = task.title
            .toLowerCase()
            .includes(query);

        const matchesFilter =
            filter === "all" ||
            (filter === "pending" && !task.completed) ||
            (filter === "completed" && task.completed);

        return matchesSearch && matchesFilter;
    });
}

export function getTaskStats() {
    const total = tasks.length;

    const completed = tasks.filter(
        (task) => task.completed
    ).length;

    return {
        total,
        completed,
        pending: total - completed
    };
}

function persistTasks(message) {
    if (!saveTasks(tasks)) {
        return {
            success: false,
            message: "Could not save changes. Check browser storage."
        };
    }

    return {
        success: true,
        message
    };
}