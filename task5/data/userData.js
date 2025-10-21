const { faker } = require('@faker-js/faker');
module.exports = {
  createNewUser() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      age: faker.number.int({ min: 20, max: 60 }).toString(),
      salary: faker.number.int({ min: 1000 ,max:20000}).toString(),
      department: faker.commerce.department()
    };
  }
};