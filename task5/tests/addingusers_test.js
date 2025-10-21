const { expect } = require('chai');
const UserData = require('../data/userData');

Feature('User Management');

Scenario('Add a new user and search', async ({ I, webTablesPage }) => {
    const newUser = UserData.createNewUser();
    webTablesPage.addUser(newUser);
    webTablesPage.searchForUser(newUser.email);

    const numberOfRowsAfterSearch = await webTablesPage.countVisibleDataRows();
            expect(numberOfRowsAfterSearch).to.equal(1, "Search should return only one row");


    const visibleData = await webTablesPage.getFirstRowData();
    
    const expectedData = {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        age: newUser.age,
        email: newUser.email,
        salary: newUser.salary,
        department: newUser.department,
    };
    expect(visibleData).to.deep.equal(expectedData, "Visible user data does not match the created user data");
});