const { expect } = require('chai');
const usersData = require('../data/usersData');

Feature('users');
Data(usersData).Scenario('Verify', async ({ I, current, webTablesPage }) => {
  await webTablesPage.goToPage();
  const userData = await webTablesPage.extractUserDataFromRow(current.userId);
  expect(userData).to.deep.equal(current.expectedUser, "user data does not match expected data");
  const apiData = await webTablesPage.getUserDataFromApi(current.userId);
  expect(apiData).to.deep.equal(current.expectedApiData, "API data does not match expected data");
});