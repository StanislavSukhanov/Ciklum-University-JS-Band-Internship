export const Todo = ({ id, title, description, priority, completed }) => {
    let markCompleted = completed ? "completed" : "";
    return `
    <li class="todo ${markCompleted}">
        <h2>${title}</h2>
        <p>${description}</p>
        <div class='todo-footer'>
        <em>${priority}</em>
        <div class="controls">
        <button class='control-btn'>...</button>
        <div class="controls-content">
        <span class="control-item done" id=${id}>done</span>
        <span class="control-item update" id=${id}>update</span>
        <span class="control-item delete" id=${id}">delete</span>
        </div>
      </div>
      </div>
      </li>
    `;
  };
  