# Smart Task Manager 📝

A simple and responsive task management web application built using HTML, CSS, and modern JavaScript (ES6+). It allows users to create, edit, delete, complete, search, and filter tasks while storing them in the browser's Local Storage.

## 📁 Project Structure

```text
smart-task-manager/
│
├── index.html
│
├── css/
│   └── style.css
│
└── js/
    ├── app.js
    ├── tasks.js
    └── storage.js
```

## ✨ Features

- **Add Tasks:** Create new tasks with a title and category.
- **Edit Tasks:** Update existing task details.
- **Delete Tasks:** Remove tasks when they are no longer needed.
- **Complete Tasks:** Mark tasks as completed or pending.
- **Search Tasks:** Find tasks using keywords.
- **Filter Tasks:** View all, pending, or completed tasks.
- **Task Statistics:** Display total, pending, and completed tasks.
- **Dark Mode:** Switch between light and dark themes.
- **Persistent Storage:** Save tasks using browser Local Storage.
- **Responsive Design:** Use the application on desktop, tablet, and mobile devices.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling and responsive design |
| JavaScript ES6+ | Application logic and interactivity |
| ES6 Modules | Organizing JavaScript into separate files |
| DOM Manipulation | Updating the interface dynamically |
| Local Storage | Persisting tasks in the browser |
| Array Methods | Searching, filtering, and managing tasks |

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/smart-task-manager.git
```

### 2. Open the Project

```bash
cd smart-task-manager
```

### 3. Run the Application

Open the project in Visual Studio Code and use the **Live Server** extension to run `index.html`.

Alternatively, serve the project using a local development server.

Because this project uses ES6 modules, run it through a local server rather than opening the HTML file directly.

## 📖 How to Use

1. Open the application in your browser.
2. Enter a task title.
3. Select a category.
4. Click **Add Task**.
5. Mark tasks as completed when finished.
6. Edit or delete tasks as needed.
7. Use the search bar to find specific tasks.
8. Use filters to view pending or completed tasks.
9. Switch between light and dark modes.

## 🧠 JavaScript Concepts Practiced

This project demonstrates several important JavaScript concepts:

- Variables and constants (`let` and `const`)
- Arrow functions
- Template literals
- Objects and arrays
- Array methods such as `filter()`, `find()`, and `map()`
- ES6 modules using `import` and `export`
- DOM manipulation
- Event handling and event delegation
- Form validation
- Local Storage API
- JSON serialization and parsing
- Conditional statements
- Error handling

## 💾 Data Storage

The application uses the browser's Local Storage to save tasks.

- Tasks remain available after refreshing the page.
- Data is stored locally in the current browser.
- Data is not automatically synchronized across devices or browsers.
- Clearing the browser's site data may remove saved tasks.

## 🔮 Future Improvements

Possible enhancements include:

- Task priorities: Low, Medium, and High
- Task deadlines and reminders
- Drag-and-drop task management
- Task sorting
- Notifications
- Backend integration using Node.js and Express
- Database integration using MongoDB
- User registration and authentication
- Automated testing

## 🎯 Project Goal

The goal of this project is to strengthen practical JavaScript skills by building an interactive task management application with modular code, persistent storage, and a responsive user interface.

---

⭐ If you find this project useful, consider giving the repository a star!
