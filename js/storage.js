const STORAGE_KEY = "smartTaskManagerTasks";

export function loadTasks() {
    try {
        const savedTasks = localStorage.getItem(STORAGE_KEY);

        if (!savedTasks) {
            return [];
        }

        const tasks = JSON.parse(savedTasks);

        if (!Array.isArray(tasks)) {
            return [];
        }

        return tasks.filter((task) =>
            task &&
            typeof task.id === "string" &&
            typeof task.title === "string" &&
            typeof task.category === "string" &&
            typeof task.completed === "boolean"
        );
    } catch (error) {
        console.error("Could not load tasks:", error);
        return [];
    }
}

export function saveTasks(tasks) {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(tasks)
        );

        return true;
    } catch (error) {
        console.error("Could not save tasks:", error);
        return false;
    }
}