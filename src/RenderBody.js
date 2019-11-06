export const RenderBody = () => {
    document.getElementById("app").innerHTML = `
    <header>
    <h1>TODOList</h1>
    <nav>
      <input type="text" id="search-by-title" placeholder="search by title" />
  
      <form action="">
        <label for="priority">Priority: </label>
        <select name="" id="priority">
          <option selected value="all">all</option>
          <option value="high">high</option>
          <option value="normal">normal</option>
          <option value="low">low</option>
        </select>
      </form>
  
      <form action="">
        <label for="filter">Status: </label>
        <select id="status">
          <option selected value="all">all</option>
          <option value="open">open</option>
          <option value="done">done</option></select
        >
      </form>
  
      <button id="create">create</button>
    </nav>
  </header>
  
  <div class="todo-form" id="formTodo"></div>
  
  <form class="add-todo hidden" id="create-todo" action="">
    <label for="title">Title: </label>
    <input id="title" type="textarea" placeholder="title" required />
    <label for="description">Description:</label>
    <textarea id="description" placeholder="description" required></textarea>
    <label for="todo-priority">Priority</label>
    <select name="priority" id="todo-priority">
      <option value="high">high</option>
      <option value="medium">medium</option>
      <option value="low">low</option>
    </select>
    <div class="form-controls">
      <input type="reset" id="cancel" value="cancel" />
      <input type="submit" id="add-todo" value="save" />
    </div>
  </form>
  
  <div id="todo-list"></div>
  
  <footer>
    <h3>Stanislav Sukhanov</h3>
  </footer>
    `;
  };
  