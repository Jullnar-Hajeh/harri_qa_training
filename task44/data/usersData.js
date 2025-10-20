module.exports = [
  {
    userId: 1, 
    action: "verify",
    apiEndpoint: "https://jsonplaceholder.typicode.com/users/1", 
    expectedUser: {
      name: "Cierra Vega",
      age: "39",
      email: "cierra@example.com",
      salary: "10000",
      department: "Insurance",
      address: {
        city: "Gwenborough"
      }
    }
  },
  {
    userId: 2, 
    action: "verify",
    apiEndpoint: "https://jsonplaceholder.typicode.com/users/2",
    expectedUser: {
      name: "Alden Cantrell",
      age: "45",
      email: "alden@example.com",
      salary: "12000",
      department: "Compliance",
      address: {
        city: "Wisokyburgh"
      }
    }
  }
];