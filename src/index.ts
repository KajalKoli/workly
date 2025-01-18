type Task = {
    id: number;
    description: string;
    completed: boolean;
  };
  
  const form = document.getElementById("todo-form") as HTMLFormElement;
  const input = document.getElementById("todo-input") as HTMLInputElement;
  const list = document.getElementById("todo-list") as HTMLUListElement;
  
  let tasks: Task[] = [];
  
  function renderTasks(): void {
    list.innerHTML = ""; 
    console.log("Rendering tasks:", tasks);

    tasks.forEach((task) => {
      const li = document.createElement("li");
  
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => toggleTaskCompletion(task.id));
  
      const span = document.createElement("span");
      span.textContent = task.description;
      span.style.textDecoration = task.completed ? "line-through" : "none";
  
      const button = document.createElement("button");
      button.textContent = "Delete";
      button.addEventListener("click", () => deleteTask(task.id));
  
      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(button);
  
      list.appendChild(li);
    });
  }
  
  function addTask(description: string): void {
    const newTask: Task = {
      id: Date.now(),
      description,
      completed: false,
    };
  
    console.log(tasks);

    tasks.push(newTask);
    renderTasks();
  }
  
  function toggleTaskCompletion(taskId: number): void {
    tasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
  }
  
  function deleteTask(taskId: number): void {
    tasks = tasks.filter((task) => task.id !== taskId);
    renderTasks();
  }
  
  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    const taskDescription = input.value.trim();
    console.log("Form submitted with value:", taskDescription);
    if (taskDescription) {
      addTask(taskDescription);
      input.value = "";
    }
  });
  