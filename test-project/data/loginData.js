module.exports = [
  {
    case: 'invalid password',
    email: 'jullnarihab61@gmail.com',
    password: '1234567',
    expectedError: 'The password you’ve entered is incorrect'
  },
  {
    case: 'non-existent email',
    email: 'notexistemailll@test.com',
    password: '123456',
    expectedError: 'The email you entered isn’t connected to an account.'
  }
];