const { expect } = require('chai');
const UserData = require('../data/userData');

Feature('Web Tables Full Suite');

const testCases = [
    { title: 'adding new user' },
    { title: 'edit user data and verify' },
    { title: 'delete user and verify' },
    { title: 'Verify "Rows per Page"' }, 
    { title: 'Verify Pagination (Next/Previous Page)' }, 
    { title: 'verify add User validation Invalid Email' },
    { title: 'add user validation empty required field' },
    { title: 'alpha Sorting' },
    { title: 'number Sorting' },
    { title: 'verify canceling adding a new user' },
    { title: 'verify canceling editing a user' },
];

Scenario(' Web Table test cases ', async ({ I, webTablesPage }) => {

    
    for (const testCase of testCases) {

        const user = UserData.generateRandomUserData();
        const editedUser = UserData.generateRandomUserData();

        switch (testCase.title) {

            case 'adding new user':
                await webTablesPage.goToPage();
                await webTablesPage.openRegistrationForm();
                await webTablesPage.fillRegistrationForm(user);
                await webTablesPage.submitForm();

                await webTablesPage.searchForUser(user.email);
                let numberOfRows = await webTablesPage.countVisibleDataRows();
                expect(numberOfRows).to.equal(1, "search should return only one row");

                let visibleData = await webTablesPage.getUserDataByEmail(user.email);
                    const expectedData = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    age: user.age,
                    email: user.email,
                    salary: user.salary,
                    department: user.department,
                };
                expect(visibleData).to.deep.equal(expectedData, "visible user data does not match the created user data");
                break;




            case 'edit user data and verify':
                await webTablesPage.goToPage();
                await webTablesPage.addNewUser(user);
                await webTablesPage.clickEditUser(user.email);
                await webTablesPage.fillRegistrationForm(editedUser); 
                await webTablesPage.submitForm();
                await webTablesPage.searchForUser(editedUser.email); 
                let visibleDataEdit = await webTablesPage.getUserDataByEmail(editedUser.email);
                const expectedEditedData = {
                    firstName: editedUser.firstName,
                    lastName: editedUser.lastName,
                    age: editedUser.age,
                    email: editedUser.email, 
                    salary: editedUser.salary,
                    department: editedUser.department,
                };
                expect(visibleDataEdit).to.deep.equal(expectedEditedData, "edited user data is incorrect");
                break;





            case 'delete user and verify':
                await webTablesPage.goToPage();
                await webTablesPage.addNewUser(user);

                await webTablesPage.clickDeleteUser(user.email);
                await webTablesPage.searchForUser(user.email);
                let rowsAfterDelete = await webTablesPage.countVisibleDataRows();
                expect(rowsAfterDelete).to.equal(0, "user row was not deleted");
                await webTablesPage.isNoRowsFoundVisible();
                break;





            case 'Verify "Rows per Page"':
            case 'Verify Pagination (Next/Previous Page)':
            case 'alpha Sorting':
            case 'number Sorting':
                await webTablesPage.goToPage();
await webTablesPage.clearAllUsers();
                const users = [];
                for (let i = 0; i < 6; i++) {
                    const multiUser = UserData.generateRandomUserData();
                    users.push(multiUser);
                    await webTablesPage.addNewUser(multiUser);
                }

                if (testCase.title === 'Verify "Rows per Page"') {
                    await webTablesPage.setRowsPerPage(5);
                    let rowsOnPage = await webTablesPage.countVisibleDataRows();
                    expect(rowsOnPage).to.equal(5, "rows per page did not update to 5");
                } 
                else if (testCase.title === 'Verify Pagination (Next/Previous Page)') {
                    await webTablesPage.setRowsPerPage(5);
                    expect(await webTablesPage.getPageNumber()).to.equal('1');
                    
                    await webTablesPage.clickNextPage();
                    expect(await webTablesPage.getPageNumber()).to.equal('2');
                    let rowsOnPage2 = await webTablesPage.countVisibleDataRows();
                    expect(rowsOnPage2).to.equal(1, "page 2 should have 1 row"); 
                    
                    await webTablesPage.clickPreviousPage();
                    expect(await webTablesPage.getPageNumber()).to.equal('1');
                    let rowsOnPage1 = await webTablesPage.countVisibleDataRows();
                    expect(rowsOnPage1).to.equal(5, "page 1 should have 5 rows");
                }
                else if (testCase.title === 'alpha Sorting') {
                    await webTablesPage.clickSortByFirstName(); 
                    let namesAsc = await webTablesPage.getColumnValues(1);
                    expect(namesAsc).to.deep.equal([...namesAsc].sort((a, b) => a.localeCompare(b)), "first Name column is not sorted Ascending");

                    await webTablesPage.clickSortByFirstName(); 
                    let namesDesc = await webTablesPage.getColumnValues(1);
                    expect(namesDesc).to.deep.equal([...namesDesc].sort((a, b) => b.localeCompare(a)), "first Name column is not sorted Descending");
                }
                else if (testCase.title === 'number Sorting') {
                    await webTablesPage.clickSortByAge(); 
                    let agesAsc = await webTablesPage.getColumnValues(3);
                    expect(agesAsc.map(Number)).to.deep.equal([...agesAsc].map(Number).sort((a, b) => a - b), "age column is not sorted Ascending");

                    await webTablesPage.clickSortByAge(); 
                    let agesDesc = await webTablesPage.getColumnValues(3);
                    expect(agesDesc.map(Number)).to.deep.equal([...agesDesc].map(Number).sort((a, b) => b - a), "age column is not sorted Descending");
                }
                break;
                
            case 'verify add User validation Invalid Email':
           await webTablesPage.goToPage();
            await webTablesPage.openRegistrationForm();
            user.email = 'jullnar@'; 
            await webTablesPage.fillRegistrationForm(user);
            await webTablesPage.submitForm();

             expect(await webTablesPage.isFormVisible()).to.be.true, "modal should remain visible after invalid submission";

            await webTablesPage.cancelFormUsingEscape();

            await webTablesPage.searchForUser(user.email);
            let rowsAfterInvalidAdd = await webTablesPage.countVisibleDataRows();
            expect(rowsAfterInvalidAdd).to.equal(0, "user was added despite invalid email validation failure");
            break;


            case 'add user validation empty required field':
                await webTablesPage.goToPage();
                await webTablesPage.openRegistrationForm();
                user.firstName = ''; 
                await webTablesPage.fillRegistrationForm(user);
                await webTablesPage.submitForm();
                
                expect(await webTablesPage.isFormVisible()).to.be.true;
                await webTablesPage.isFirstNameFieldInvalid();
                break;





            case 'verify canceling adding a new user':
                await webTablesPage.goToPage();
                await webTablesPage.openRegistrationForm();
                await webTablesPage.fillRegistrationForm(user);
                await webTablesPage.cancelForm();
                
                expect(await webTablesPage.isFormVisible()).to.be.false;

                await webTablesPage.searchForUser(user.email);
                let rowsAfterCancel = await webTablesPage.countVisibleDataRows();
                expect(rowsAfterCancel).to.equal(0, "user was added after canceling");
                break;
                
            case 'verify canceling editing a user':
                await webTablesPage.goToPage();
                await webTablesPage.addNewUser(user);
                await webTablesPage.clickEditUser(user.email);
                await webTablesPage.fillRegistrationForm(editedUser);
                await webTablesPage.cancelForm();
                expect(await webTablesPage.isFormVisible()).to.be.false;
                await webTablesPage.searchForUser(user.email);
                let visibleDataCancel = await webTablesPage.getUserDataByEmail(user.email);
                expect(visibleDataCancel.firstName).to.equal(user.firstName, "user data was changed after canceling edit");
                expect(visibleDataCancel.email).to.equal(user.email, "user data was changed after canceling edit");
                break;

            default:

                break;
        }
    }

});