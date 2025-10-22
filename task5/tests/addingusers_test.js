const { expect } = require('chai');
const UserData = require('../data/userData');

Feature('User Management');

const newUser = UserData.generateRandomUserData();

Data([newUser]).Scenario('Add a new user and search', async ({ I, webTablesPage, current }) => {    
    await webTablesPage.goToPage();
    await webTablesPage.openRegistrationForm();
    await webTablesPage.fillRegistrationForm(current);
    await webTablesPage.submitForm();
    await webTablesPage.searchForUser(current.email);

    let numberOfRowsAfterSearch = await webTablesPage.countVisibleDataRows();
    expect(numberOfRowsAfterSearch).to.equal(1, "Search should return only one row");

    let visibleData = await webTablesPage.getUserDataByEmail(current.email);
    
    const expectedData = {
        firstName: current.firstName,
        lastName: current.lastName,
        age: current.age,
        email: current.email,
        salary: current.salary,
        department: current.department,
    };
    
    expect(visibleData).to.deep.equal(expectedData, "Visible user data does not match the created user data");
});