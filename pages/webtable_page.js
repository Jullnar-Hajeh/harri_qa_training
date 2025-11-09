const { I } = inject();
const { expect } = require('chai'); 

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
    editIconByEmail: (email) => `//div[text()='${email}']/following-sibling::div//span[@title='Edit']`,
    deleteIconByEmail: (email) => `//div[text()='${email}']/following-sibling::div//span[@title='Delete']`,
    rowsPerPageSelect: `//select[@aria-label='rows per page']`,
    nextPageButton: `//button[text()='Next']`,
    previousPageButton: `//button[text()='Previous']`,
    pageNumberInput: `//input[contains(@aria-label, 'page')]`,
    headerFirstName: `//div[text()='First Name']`,
    headerAge: `//div[text()='Age']`,
    formModal: `//div[@class='modal-content']`, 
    cancelButton: `//button[@class='close']`, 
    emailInputInvalid: `//input[@id='userEmail' and contains(@class, 'is-invalid')]`,
    firstNameInputInvalid: `input#firstName:invalid`,
    allDeleteIcons: `//span[@title='Delete']`,
    noRowsFoundText: `//div[@class='rt-noData']`,
  },
  
  async goToPage() {
    await I.amOnPage('/webtables');
  },

  async openRegistrationForm() {
    await I.waitForVisible(this.locators.addButton, 5);
    await I.click(this.locators.addButton);
    await I.waitForVisible(this.locators.formModal, 5); 
  },
  
  async fillRegistrationForm(user) {
    await I.fillField(this.locators.firstNameInput, user.firstName || ''); 
    await I.fillField(this.locators.lastNameInput, user.lastName || '');
    await I.fillField(this.locators.emailInput, user.email || '');
    await I.fillField(this.locators.ageInput, user.age || '');
    await I.fillField(this.locators.salaryInput, user.salary || '');
    await I.fillField(this.locators.departmentInput, user.department || '');
  },
  
  async submitForm() {
    await I.click(this.locators.submitButton);
  },

  async searchForUser(searchText) {
    await I.fillField(this.locators.searchBox, searchText);
    await I.wait(0.5); 
  },

  async countVisibleDataRows() {
    let hasRows = await I.grabNumberOfVisibleElements(this.locators.noRowsFoundText);
    if (hasRows > 0) {
      return 0; 
    }
    await I.waitForElement(this.locators.dataRows, 5);
    return await I.grabNumberOfVisibleElements(this.locators.dataRows);
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
  },
  async addNewUser(user) {
    await this.openRegistrationForm();
    await this.fillRegistrationForm(user);
    await this.submitForm();
    await I.waitForElement(this.locators.userRowByEmail(user.email), 10);
  },

  async clickEditUser(email) {
    const editLocator = this.locators.editIconByEmail(email);
    await I.waitForVisible(editLocator, 10);
    await I.click(editLocator);
    await I.waitForVisible(this.locators.formModal, 5);
  },

  async clickDeleteUser(email) {
    const deleteLocator = this.locators.deleteIconByEmail(email);
    await I.waitForVisible(deleteLocator, 10);
    await I.click(deleteLocator);
    await I.waitToHide(this.locators.userRowByEmail(email), 10);
  },


  async setRowsPerPage(rows) {
    await I.selectOption(this.locators.rowsPerPageSelect, rows.toString());
    let rowsAfter = await this.countVisibleDataRows();
    expect(rowsAfter).to.be.at.most(rows);
  },

  async clickNextPage() {
    await I.click(this.locators.nextPageButton);
  },

  async clickPreviousPage() {
    await I.click(this.locators.previousPageButton);
  },

  async getPageNumber() {
    return await I.grabValueFrom(this.locators.pageNumberInput);
  },

  async clickSortByFirstName() {
    await I.click(this.locators.headerFirstName);
  },

  async clickSortByAge() {
    await I.click(this.locators.headerAge);
  },

  async getColumnValues(columnIndex) {
    const columnLocator = `//div[@class='rt-tbody']/div[@class='rt-tr-group' and not(contains(@style, 'display: none'))]//div[@class='rt-td'][${columnIndex}]`;
    await I.waitForElement(columnLocator, 5);
    const values = await I.grabTextFrom(columnLocator);
    return Array.isArray(values) ? values.filter(v => v.trim() !== '') : [values].filter(v => v.trim() !== '');
  },

  async cancelForm() {
    await I.click(this.locators.cancelButton);
    await I.waitToHide(this.locators.formModal, 5);
  },

 async isFormVisible() {
 const count = await I.grabNumberOfVisibleElements(this.locators.formModal);
 return count > 0;
 },


  async clearAllUsers() {
    await I.waitForElement(this.locators.tableBody, 10);

    let noRowsFoundCount = await I.grabNumberOfVisibleElements(this.locators.noRowsFoundText);
    if (noRowsFoundCount > 0) {
      return; 
    }
    
    const deleteIconsCount = await I.grabNumberOfVisibleElements(this.locators.allDeleteIcons);
    
    if (deleteIconsCount === 0) {
        return;
    }
    

    const firstDeleteIcon = `(${this.locators.allDeleteIcons})[1]`;
    for (let i = 0; i < deleteIconsCount; i++) {
      await I.click(firstDeleteIcon);
    }
    
    await I.waitForVisible(this.locators.noRowsFoundText, 10);
  },
  
  async isEmailFieldInvalid() {
    await I.waitForVisible(this.locators.emailInputInvalid,3);
  },

async isFormNotVisible() {
    I.dontSeeElement(this.locators.formModal); 
},

 async cancelFormUsingEscape() {
   await I.pressKey('Escape');
 await I.waitToHide(this.locators.formModal, 5); 
 },

  async isFirstNameFieldInvalid() {
    await I.waitForVisible(this.locators.firstNameInputInvalid,3);
  },
  
  async isNoRowsFoundVisible() {
     await I.seeElement(this.locators.noRowsFoundText);
  }
};