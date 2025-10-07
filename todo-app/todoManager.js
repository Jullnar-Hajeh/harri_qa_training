const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname,'todos.json');


async function saveTodos(todos) {
  await fs.writeFile(filePath, JSON.stringify(todos, null, 2));
}


async function getTodos(){
    try{
    const data = await fs.readFile(filePath,'utf8');
    return JSON.parse(data);}
    catch{
return [];
    }

}

async function addTodo(title) {
   try { let todos = await getTodos();

const newTodo ={
    id: todos.length > 0 ? todos[todos.length-1].id +1 :1,
    title :title,
    completed:false
};
todos.push(newTodo);
await saveTodos(todos);}
catch {console.log("erron in adding it");}
}



async function completeTodo(id){
    try {
        let todos = await getTodos();
        let todo = todos.find(todoItem => todoItem.id === id);


        if(!todo){
        console.log("cant find it to make it complete"); return; }
     todo.completed = true;
     await saveTodos(todos);
        
    }catch{
        console.log("error in completing it ")
    }
}

async function deleteTodo(id) {
    try{
        let todos =await getTodos();
        let todo = todos.find(todoItem => todoItem.id === id);
        if (!todo) {
          console.log("Todo not found for deleting");
        return;
  }
todos = todos.filter(todoItem => todoItem.id !== id);
  await saveTodos(todos);
        
    }catch{
        console.log('error in deleting it')
    }
    
}




module.exports = {addTodo , getTodos  , completeTodo , deleteTodo};