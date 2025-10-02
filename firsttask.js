const users = [
{ id: 1, name: 'Alice', age: 28, active: true },
{ id: 2, name: 'Bob', age: 34, active: false },
{ id: 3, name: 'Charlie', age: 22, active: true },
{ id: 4, name: 'Dana', age: 40, active: false },
];

let userLength = users.length;
let i ;

function getActiveUsers(users)
{
    const activeUsersName=users.filter(user => user.active).map (user=>user.name);
    // for (i =0; i<userLength; i++){
    //   if (users[i].active === true){
    // activeUsersName.push(users[i].name);
    //   }
    // }
return activeUsersName;
}
function  getAverageAge(users){
let sumage = users.reduce((acc,user)=>acc+user.age,0) 
    return sumage/userLength;
}


function findUserById(users, id){
   const user =users.find(user =>user.id === id)
   if(user)
    return user;
   else 
    return [];
}


function sortUsersByAge(users, direction){
    const sortedusers = users.slice();
    if (direction == "asc"){
        sortedusers.sort(function(a, b){return a.age - b.age})
       return sortedusers;
    }
    else if(direction == "desc"){
       sortedusers.sort(function(a, b){return b.age - a.age})
       return sortedusers;
    }

}


function toggleUserActive(users, id){
 
        let toggleuser = findUserById(users ,id);
        if (toggleuser.length === 0){
            console.log("we dont find the user with this id");
           return [];}
        else
        {
           
            toggleuser.active= !toggleuser.active;
            console.log("we change its activation")
            console.log(users);
            return users;
    }
        // if (toggleuser.active == true)
        //     toggleuser.active = false;
        // else 
        //     toggleuser.active = true;
    
}



const activeusers=getActiveUsers(users);
let activeusersLength = activeusers.length;
if(activeusersLength!=0){

   console.log("The Active Users "); 
   for (i=0 ; i<activeusersLength ;i++){
   console.log(activeusers[i]); 

   }
}
else{
    console.log("Ther is no active users ");
}

let avaregeAge = getAverageAge(users);
console.log("Avarege age:");
console.log(avaregeAge);

let finduser = findUserById(users , 3);
if (finduser.length == 0)
    console.log("there is no user with this id");
else {
    console.log("we found the user :")
    console.log(finduser);}


let sorted = sortUsersByAge(users , "desc");
console.log("desc sort ");
console.log(sorted);

 sorted = sortUsersByAge(users , "asc");
 console.log("asc sort ");
console.log(sorted);

console.log("The array");

console.log(users);


let userToggle= toggleUserActive(users , 2);


