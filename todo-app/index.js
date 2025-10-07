const todo = require('./todoManager.js');

async function run() {
  await todo.addTodo('Learn async/await in Node.js');
  await todo.addTodo('Build a Node.js project');

  console.log(await todo.getTodos());

  await todo.completeTodo(8);
  await todo.deleteTodo(5);

  console.log(await todo.getTodos());
}

run();
