type Task = {
    id: number;
    title: string;
    completed: boolean;
    createdAt: Date;
  };
  
  const list = document.querySelector<HTMLUListElement>('#taskList')!;
  const button = document.querySelector<HTMLButtonElement>('#addButton')!;
  const input = document.querySelector<HTMLInputElement>('#taskInput')!;
  
  const tasks: Task[] = loadTasks();
  
  tasks.forEach(addListItem);
  
  button?.addEventListener('click', () => {
    if (input.value === '') return;
  
    const newTask: Task = {
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
  
  function addListItem(task: Task) {
    const item = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');

    checkbox.addEventListener('change', () => {
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
    list?.append(item);
}
  
  function saveTasks() {
    const incompleteTasks = tasks.filter(task => !task.completed);
    localStorage.setItem('TASKS', JSON.stringify(incompleteTasks));
  }
  
  function loadTasks(): Task[] {
    const taskJSON = localStorage.getItem('TASKS');
    if (taskJSON == null) return [];
    return JSON.parse(taskJSON);
  }
  