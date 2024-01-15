var list = document.querySelector('#taskList');
var button = document.querySelector('#addButton');
var input = document.querySelector('#taskInput');
var tasks = loadTasks();
tasks.forEach(addListItem);
button === null || button === void 0 ? void 0 : button.addEventListener('click', function () {
    if (input.value === '')
        return;
    var newTask = {
        id: tasks.length + 1,
        title: input.value,
        completed: false,
        createdAt: new Date(),
    };
    tasks.push(newTask);
    addListItem(newTask);
    input.value = '';
    saveTasks();
});
function addListItem(task) {
    var item = document.createElement('li');
    var label = document.createElement('label');
    var checkbox = document.createElement('input');
    checkbox.addEventListener('change', function () {
        task.completed = checkbox.checked;
        label.classList.toggle('completed', task.completed);
        saveTasks();
    });
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.classList.add('mr-3', 'bg-blue-500', 'text-white', 'rounded');
    label.classList.add('cursor-pointer', 'text-2xl');
    label.classList.toggle('line-through', task.completed);
    label.append(checkbox, task.title);
    item.append(label);
    list === null || list === void 0 ? void 0 : list.append(item);
}
function saveTasks() {
    var incompleteTasks = tasks.filter(function (task) { return !task.completed; });
    localStorage.setItem('TASKS', JSON.stringify(incompleteTasks));
}
function loadTasks() {
    var taskJSON = localStorage.getItem('TASKS');
    if (taskJSON == null)
        return [];
    return JSON.parse(taskJSON);
}
