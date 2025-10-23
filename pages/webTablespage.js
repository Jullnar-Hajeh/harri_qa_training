const { I } = inject();

module.exports = {

  locators: {
    addButton: `//button[@id='addNewRecordButton']`,
    searchBox: `//input[@id='searchBox']`,
    firstNameInput: `//input[@id='firstName']`,
    lastNameInput: `//input[@id='lastName']`,
    emailInput: `//input[@id='userEmail']`,
    ageInput: `//input[@id='age']`,
    salaryInput: `//input[@id='salary']`,
    departmentInput: `//input[@id='department']`,
    submitButton: `//button[@id='submit']`,
    dataRows: `//div[@class='rt-tbody']/div[@class='rt-tr-group' and not(contains(@style, 'display: none')) and not(.//div[contains(@class, '-padRow')])]`,
    tableBody: `//div[@class='rt-tbody']`,
    userRowByEmail: (email) => `//div[@class='rt-tr-group' and .//div[text()='${email}']]`,
  },
  

 async goToPage() {
    await I.amOnPage('/webtables');
  },

 async openRegistrationForm() {
    await I.waitForVisible(this.locators.addButton, 5);
    await I.click(this.locators.addButton);
  },
  
 async fillRegistrationForm(user) {
    await I.fillField(this.locators.firstNameInput, user.firstName);
    await I.fillField(this.locators.lastNameInput, user.lastName);
    await I.fillField(this.locators.emailInput, user.email);
    await I.fillField(this.locators.ageInput, user.age);
    await I.fillField(this.locators.salaryInput, user.salary);
    await I.fillField(this.locators.departmentInput, user.department);
  },
  
  async submitForm() {
    await I.click(this.locators.submitButton);
  },


 
async searchForUser(searchText) {
 await I.fillField(this.locators.searchBox, searchText);

await I.waitNumberOfVisibleElements(this.locators.dataRows, 1, 10); 

    await I.waitForText(searchText, 5, this.locators.tableBody);
   },

async countVisibleDataRows() {
    await I.waitForElement(this.locators.dataRows, 10);
    return count = await I.grabNumberOfVisibleElements(this.locators.dataRows);
  },

async getUserDataByEmail(email) {
    const rowLocator = this.locators.userRowByEmail(email);
    await I.waitForElement(rowLocator, 10);

    const firstName = await I.grabTextFrom(`${rowLocator}//div[@class='rt-td'][1]`);
    const lastName = await I.grabTextFrom(`${rowLocator}//div[@class='rt-td'][2]`);
    const age = await I.grabTextFrom(`${rowLocator}//div[@class='rt-td'][3]`);
    const userEmail = await I.grabTextFrom(`${rowLocator}//div[@class='rt-td'][4]`);
    const salary = await I.grabTextFrom(`${rowLocator}//div[@class='rt-td'][5]`);
    const department = await I.grabTextFrom(`${rowLocator}//div[@class='rt-td'][6]`);
    
    return { firstName, lastName, age, email: userEmail, salary, department };
  }
};