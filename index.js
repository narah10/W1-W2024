var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Define a Task class to represent each task
var Task = /** @class */ (function () {
    function Task(id, text, completed) {
        this.id = id;
        this.text = text;
        this.completed = completed;
    }
    return Task;
}());
// Array to store tasks
var tasks = [];
// Function to add a new task
function addTask() {
    var inputElement = document.getElementById('taskInput');
    var taskText = inputElement.value.trim();
    if (taskText !== '') {
        var newTask = new Task(tasks.length + 1, taskText, false);
        tasks.push(newTask);
        inputElement.value = ''; // Clear the input field
        renderTasks();
    }
}
// Function to toggle the completion status of a task
function toggleTaskStatus(id) {
    tasks = tasks.map(function (task) { return (task.id === id ? __assign(__assign({}, task), { completed: !task.completed }) : task); });
    renderTasks();
}
// Function to remove a task
function removeTask(id) {
    tasks = tasks.filter(function (task) { return task.id !== id; });
    renderTasks();
}
// Function to render the list of tasks
function renderTasks() {
    var taskListElement = document.getElementById('taskList');
    if (taskListElement) {
        taskListElement.innerHTML = ''; // Clear the existing list
        tasks.forEach(function (task) {
            var listItem = document.createElement('li');
            listItem.innerHTML = "\n                <input type=\"checkbox\" ".concat(task.completed ? 'checked' : '', " onchange=\"toggleTaskStatus(").concat(task.id, ")\">\n                <span class=\"").concat(task.completed ? 'line-through' : '', "\">").concat(task.text, "</span>\n                <button onclick=\"removeTask(").concat(task.id, ")\" class=\"ml-4 bg-red-500 text-white px-2 py-1\">Remove</button>\n            ");
            taskListElement.appendChild(listItem);
        });
    }
}
// Initial rendering of tasks
renderTasks();
