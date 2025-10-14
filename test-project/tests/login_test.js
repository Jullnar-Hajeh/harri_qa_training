const { expect } = require('chai');
const loginPage = require('../pages/loginPage');
const loginScenarios = require('../data/loginData');

Feature('Facebook Login');
Data(loginScenarios).Scenario('Login with various invalid credentials', async ({ I, current }) => {
  await loginPage.openLoginPage();
  await loginPage.fillEmail(current.email);
  await loginPage.fillPassword(current.password);
  await loginPage.clickLogin();

  const actualError = await loginPage.readErrorMessage();
  expect(actualError).to.include(current.expectedError);
});