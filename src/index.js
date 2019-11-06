import { RenderBody } from "./RenderBody";
import { RenderTodos } from "./RenderTodos";
import { initStore, getIndexOfTodo, setLocalStorage } from "./helpers";
import "./styles.scss";

RenderBody();

// V A R I A B L E S;
const store = initStore();
let formWrapper = document.getElementById("formTodo");
let createTodo = document.getElementById("create-todo");
let createButton = document.getElementById("create");
let searchByTitle = document.getElementById("search-by-title");
let filterByStatus = document.getElementById("status");
let filterByPriority = document.getElementById("priority");
let cancelButton = document.getElementById("cancel");

// L O G I C
const toggleForm = () => {
  formWrapper.classList.toggle("show");
  createTodo.classList.toggle("hidden");
};

const cleanForm = () => {
  document.getElementById("title").value = null;
  document.getElementById("description").value = null;
};

const updateTodoList = () => {
  document.getElementById("todo-list").innerHTML = "";
  document.getElementById("todo-list").innerHTML = RenderTodos(store);
};

const addHandlers = () => {
  let delBtns = document.querySelectorAll(".delete");
  delBtns.forEach(button => {
    button.onclick = () => deleteTodo(parseInt(button.id, 10));
  });
  let completeBtns = document.querySelectorAll(".done");
  completeBtns.forEach(button => {
    button.onclick = () => completeTodo(parseInt(button.id, 10));
  });
  let updateBtns = document.querySelectorAll(".update");
  updateBtns.forEach(button => {
    button.onclick = () => {
      toggleForm();
      showFormWithTodo(parseInt(button.id, 10));
    };
  });
};

const renderTodoList = () => {
  updateTodoList();
  addHandlers();
};

export const addTodo = todo => {
  let { id, title, description, priority } = todo;
  store.todos.unshift({
    id: id,
    title: title,
    description: description,
    priority: priority,
    completed: false
  });
  store.id++;
  renderTodoList();
};

export const updateTodo = todo => {
  let { id } = todo;
  let index = getIndexOfTodo(id, store.todos);
  store.todos[index] = todo;
  renderTodoList();
  store.update = false;
  store.activeId = null;
};

const deleteTodo = id => {
  if (store.view) {
    let indeOfTodo = getIndexOfTodo(id, store.view);
    store.view.splice(indeOfTodo, 1);
  }
  let indexOfTodo = getIndexOfTodo(id, store.todos);
  store.todos.splice(indexOfTodo, 1);
  renderTodoList();
  setLocalStorage(store);
};

export const completeTodo = id => {
  if (store.view) {
    let indeOfTodo = getIndexOfTodo(id, store.view);
    store.view.splice(indeOfTodo, 1);
  }
  let indexOfTodo = getIndexOfTodo(id, store.todos);
  store.todos[indexOfTodo].completed = !store.todos[indexOfTodo].completed;
  renderTodoList();
  setLocalStorage(store);
};

const showFormWithTodo = id => {
  store.activeId = id;
  store.update = true;
  let indexOfTodo = getIndexOfTodo(id, store.todos);
  let todo = store.todos[indexOfTodo];
  document.getElementById("todo-priority").value = todo.priority;
  document.getElementById("title").value = todo.title;
  document.getElementById("description").value = todo.description;
};

const showTodosByStatus = status => {
  if (status !== "all") {
    let filterValue = status === "open" ? false : true;
    let tempStore = store.todos.filter(todo => todo.completed === filterValue);
    store.view = tempStore;
    renderTodoList();
  } else {
    store.view = false;
    renderTodoList();
  }
};

const showTodosByPriority = priority => {
  switch (priority) {
    case "high":
      let view = store.todos.filter(todo => todo.priority === "high");
      store.view = view;
      break;
    case "normal":
      store.view = store.todos.filter(todo => todo.priority === "medium");
      break;
    case "low":
      store.view = store.todos.filter(todo => todo.priority === "low");
      break;
    default:
      store.view = null;
  }
  renderTodoList();
};

export const showTodosByTitle = title => {
  let titleLow = title.toLowerCase();
  let tempStore = store.todos.filter(todo =>
    todo.title.toLowerCase().includes(titleLow)
  );
  store.view = tempStore;
  renderTodoList();
};

renderTodoList();

// EVENT HANDLERS

cancelButton.onclick = () => toggleForm();

createButton.onclick = () => toggleForm();

searchByTitle.onkeyup = () => {
  showTodosByTitle(searchByTitle.value);
};

filterByStatus.onchange = () => {
  showTodosByStatus(filterByStatus.value);
};

filterByPriority.onchange = () => {
  showTodosByPriority(filterByPriority.value, store);
};

createTodo.onsubmit = e => {
  e.preventDefault();
  let title = document.getElementById("title");
  let description = document.getElementById("description");
  let priority = document.getElementById("todo-priority");
  let id = store.update ? store.activeId : store.id;
  let todo = {
    id: id,
    title: title.value,
    description: description.value,
    priority: priority.value
  };
  if (store.update) {
    updateTodo(todo);
  } else {
    addTodo(todo);
  }
  toggleForm();
  cleanForm();
  setLocalStorage(store);
};
