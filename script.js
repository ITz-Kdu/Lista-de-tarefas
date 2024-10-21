const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const clearButton = document.getElementById('clearButton');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Função para renderizar a lista de tarefas
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.name;
        li.className = task.completed ? 'completed' : '';
        
        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? 'Reverter' : 'Concluir';
        completeButton.onclick = () => toggleTask(index);
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => removeTask(index);

        li.appendChild(completeButton);
        li.appendChild(removeButton);
        taskList.appendChild(li);
    });
}

// Função para adicionar uma tarefa
function addTask() {
    if (taskInput.value) {
        tasks.push({ name: taskInput.value, completed: false });
        taskInput.value = '';
        saveTasks();
        renderTasks();
    }
}

// Função para marcar uma tarefa como concluída
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Função para remover uma tarefa
function removeTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Função para limpar a lista de tarefas
function clearTasks() {
    tasks = [];
    saveTasks();
    renderTasks();
}

// Função para salvar tarefas no localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Eventos
addButton.onclick = addTask;
clearButton.onclick = clearTasks;
window.onload = renderTasks;
