const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname,'todos.json');

async function addTodo(title) {
    let todos
    try{
        const data = await fs.readFile(filePath,'utf8');
        todos= JSON.parse(data);
    }catch{
        todos = []
    }
const newTodo ={
    id: todos.length > 0 ? todos[todos.length-1].id +1 :1,
    title :title,
    completed:false
};
todos.push(newTodo);
await fs.writeFile(filePath,JSON.stringify(todos,null,2))
}

async function getTodos(){
    try{
    const data = await fs.readFile(filePath,'utf8');
    return JSON.parse(data);}
    catch{
return [];
    }

}

async function completeTodo(id){
    try {
        const data = await fs.readFile(filePath,'utf8');
        let todos = JSON.parse(data);
        let todo = todos.find(todoItem => todoItem.id === id);
        if(todo){
            todo.completed = true;
            await fs.writeFile(filePath , JSON.stringify(todos,null,2));
        }
    }catch{
        console.log("error in complete it ")
    }
}

async function deleteTodo(id) {
    try{
        const data = await fs.readFile(filePath,'utf8');
        let todos = JSON.parse(data);
        let todo = todos.find(todoItem => todoItem.id === id);
        if (!todo) {
          console.log("Todo not found");
        return;
  }
todos = todos.filter(todoItem => todoItem.id !== id);
  await fs.writeFile(filePath,JSON.stringify(todos,null,2));
        
    }catch{
        console.log('error in deleting it')
    }
    
}

module.exports = {addTodo , getTodos  , completeTodo , deleteTodo};