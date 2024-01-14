class Task {
    constructor(public id: number, public text: string, public completed: boolean) {}
}

let tasks: Task[] = [];

// Function to add a new task
function addTask() {
    const inputElement = document.getElementById('taskInput') as HTMLInputElement;
    const taskText = inputElement.value.trim();

    if (taskText !== '') {
        const newTask = new Task(tasks.length + 1, taskText, false);
        tasks.push(newTask);
        inputElement.value = '';
        renderTasks();
    }
}

// Function to toggle the completion status of a task
function toggleTaskStatus(id: number) {
    tasks = tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task));
    renderTasks();
}

// Function to remove a task
function removeTask(id: number) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function renderTasks() {
    const taskListElement = document.getElementById('taskList');
    if (taskListElement) {
        taskListElement.innerHTML = ''; 

        tasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <input type="checkbox" class="mr-2" ${task.completed ? 'checked' : ''} onchange="toggleTaskStatus(${task.id})">
                <span class="${task.completed ? 'line-through' : ''}">${task.text}</span>
                <button onclick="removeTask(${task.id})" class="ml-4 bg-red-500 text-white px-2 py-1">Remove</button>
            `;
            taskListElement.appendChild(listItem);
        });
    }
}

renderTasks();
