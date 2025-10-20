const assert = require('assert');
const usersData = require('../data/usersData');
Feature('users');
Data(usersData).Scenario('Verify', async ({ I, current, webTablesPage }) => {
  await webTablesPage.goToPage();
  const finalUserData = await webTablesPage.getMergedUserData(current.userId, current.apiEndpoint);
  assert.deepStrictEqual(finalUserData, current.expectedUser, "the merged data does not match the expected data");
});