document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const listElement = document.querySelector("#tasks");

    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        const taskElement = createTaskElement(task);
        listElement.appendChild(taskElement);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const task = input.value.trim();
        if (!task) return;

        const taskElement = createTaskElement(task);
        listElement.appendChild(taskElement);

        input.value = '';
        saveTasks();
    });

    function createTaskElement(taskText) {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');

        const contentElement = document.createElement('div');
        contentElement.classList.add('content');
        taskElement.appendChild(contentElement);

        const inputElement = document.createElement('input');
        inputElement.classList.add('text');
        inputElement.type = 'text';
        inputElement.value = taskText;
        inputElement.setAttribute('readonly', 'readonly');
        contentElement.appendChild(inputElement);

        const actionsElement = document.createElement('div');
        actionsElement.classList.add('actions');

        const editButton = createButton('Edit', 'edit', () => toggleEdit(inputElement, editButton));
        const deleteButton = createButton('Delete', 'delete', () => deleteTask(taskElement));

        actionsElement.append(editButton, deleteButton);
        taskElement.appendChild(actionsElement);

        return taskElement;
    }

    function createButton(text, className, onClick) {
        const button = document.createElement('button');
        button.classList.add(className);
        button.innerText = text;
        button.addEventListener('click', onClick);
        return button;
    }

    // Toggle edit/save mode
    function toggleEdit(inputElement, button) {
        if (button.innerText.toLowerCase() === 'edit') {
            button.innerText = 'Save';
            inputElement.removeAttribute('readonly');
            inputElement.focus();
        } else {
            button.innerText = 'Edit';
            inputElement.setAttribute('readonly', 'readonly');
            saveTasks();
        }
    }

    function deleteTask(taskElement) {
        listElement.removeChild(taskElement);
        saveTasks();
    }

    function saveTasks() {
        const tasks = Array.from(listElement.querySelectorAll('.text'))
            .map(input => input.value);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
