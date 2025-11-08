const { faker } = require('@faker-js/faker');

function getRandomFirstName() {
    return faker.person.firstName();
}

function getRandomLastName() {
    return faker.person.lastName();
}

function getRandomEmail() {
    return faker.internet.email().toLowerCase();
}

function getRandomAge() {
    return faker.number.int({ min: 20, max: 60 }).toString();
}

function getRandomSalary() {
    return faker.number.int({ min: 1000 ,max:20000}).toString();
}

function getRandomDepartment() {
    return faker.commerce.department();
}

module.exports = {
  generateRandomUserData() {
    return {
      firstName: getRandomFirstName(),
      lastName: getRandomLastName(),
      email: getRandomEmail(),
      age: getRandomAge(),
      salary: getRandomSalary(),
      department: getRandomDepartment()
    };
  },
};