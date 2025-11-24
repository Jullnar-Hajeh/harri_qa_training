const { expect } = require('chai'); 
const testData = require('../data/testData');

Feature('Employee Creation Task');

const dataset = testData.getDatatable();

Before(({ I }) => {
    const uniqueEmail = testData.generateUniqueEmail();
        I.tempData = {
        email: uniqueEmail,
        employeeId: Date.now().toString().slice(-6)
    };
});

After(async ({ I, orangePage }) => {
    if (I.currentName) {
        try {
           await orangePage.searchForEmployee(I.tempData.employeeId);
            await orangePage.deleteEmployee(I.tempData.employeeId);
        } catch (e) {
        }
    }
});


Data(dataset).Scenario('Employee creation', async ({ I, orangePage, current }) => {

    current.email = I.tempData.email;
    current.employeeId = I.tempData.employeeId;
        I.currentName = current.name;


    const response = await I.sendPostRequest(
        'https://reqres.in/api/users', 
        {
            name: current.name,
            job: current.role
        }
    );

    if (response.status === 201) {
        current.apiId = response.data.id;
    }

    await orangePage.login('Admin', 'admin123'); 
    
    await orangePage.goToAddEmployeePage();

    await orangePage.fillEmployeeForm({
        firstName: current.name, 
        lastName: 'AutoTest',   
        email: current.email,    
        employeeId: current.employeeId
    });

 await orangePage.searchForEmployee(current.employeeId);
    
    
await orangePage.verifyEmployeeDataWithGrab(current.name, current.employeeId);
});