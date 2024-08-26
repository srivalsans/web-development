document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');
            if (task.completed) taskItem.classList.add('completed');
            taskItem.innerHTML = `
                <span class="task-text">${task.text}</span>
                <div class="task-item-controls">
                    <button class="edit-btn" data-index=${index}>Edit</button>
                    <button class="delete-btn" data-index=${index}>Delete</button>
                </div>
            `;
            taskItem.querySelector('.task-text').addEventListener('click', () => toggleTaskCompletion(index));
            taskList.appendChild(taskItem);
        });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTask() {
        const text = taskInput.value.trim();
        if (text === '') {
            alert('Please enter a task');
            return;
        }
        tasks.push({ text, completed: false });
        taskInput.value = '';
        saveTasks();
        renderTasks();
    }

    function editTask(index) {
        const newText = prompt('Edit your task:', tasks[index].text);
        if (newText !== null && newText.trim() !== '') {
            tasks[index].text = newText.trim();
            saveTasks();
            renderTasks();
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    function toggleTaskCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    taskList.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        if (e.target.matches('.edit-btn')) {
            editTask(index);
        } else if (e.target.matches('.delete-btn')) {
            deleteTask(index);
        }
    });

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    renderTasks();
});
