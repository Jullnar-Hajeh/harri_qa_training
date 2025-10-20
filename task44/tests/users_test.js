const assert = require('assert'); 
const got = require('got');
const webTablesPage = require('../pages/webTablesPage');
const usersData = require('../data/usersData'); 
Feature('users');
Data(usersData).Scenario('Verify', async ({ I, current }) => {
  I.amOnPage('/');
  const userdata = await webTablesPage.extractUserDataFromRow(current.userId);
  const apiResponse = await got(current.apiEndpoint).json();
  const cityapi = apiResponse.address.city;
  userdata.address = {
    city: cityapi
  };
  console.log("comparing data:", current.expectedUser.name);
  console.log("merged data:", userdata);
  console.log("expected data:", current.expectedUser);
  assert.deepStrictEqual(userdata, current.expectedUser, "the merged data does not match the expected data");
  console.log("successful");
});