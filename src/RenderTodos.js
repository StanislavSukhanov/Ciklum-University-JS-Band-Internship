import { Todo } from "./Todo";

export const RenderTodos = store => {
  let view = store.view ? "view" : "todos";
  let todos = store[view].map(todo => Todo(todo)).join("");

  return `<ul class="todo-list">${todos}</ul>`;
};
