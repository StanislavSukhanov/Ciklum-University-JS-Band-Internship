export const initStore = () => {
  let store = window.localStorage.getItem("store");
  let emptyStore = {
    id: 0,
    update: false,
    activeId: null,
    todos: [],
    view: false
  };
  if (!store) {
    window.localStorage.setItem("store", JSON.stringify(emptyStore));
    return emptyStore;
  } else {
    return JSON.parse(store);
  }
};

export const setLocalStorage = store => {
  window.localStorage.setItem("store", JSON.stringify(store));
};

export const getIndexOfTodo = (id, todos) => {
  let index = -1;
  todos.forEach((todo, ind) => {
    if (todo.id === id) index = ind;
  });
  return index;
};
