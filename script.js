const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

function saveTasks() {
    const tasks = [];

    document.querySelectorAll("#taskList li").forEach(function (li) {
        const taskText = li.querySelector("span").textContent;

        tasks.push({
            text: taskText,
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskElement(taskText, completed = false) {
    const li = document.createElement("li");

    if (completed) {
        li.classList.add("completed");
    }

    const span = document.createElement("span");
    span.textContent = taskText;

    span.addEventListener("click", function () {
        li.classList.toggle("completed");
        saveTasks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
        li.remove();
        saveTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    createTaskElement(taskText);

    taskInput.value = "";

    saveTasks();
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(function (task) {
        createTaskElement(task.text, task.completed);
    });
}

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

loadTasks();
