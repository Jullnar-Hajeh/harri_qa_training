const { I } = inject();
const { expect } = require('chai');

module.exports = {

  locators: {
    usernameInput: "//input[@name='username']",
    passwordInput: "//input[@name='password']",
    loginButton: "//button[@type='submit']",
    pimMenuLink: "//a[contains(@href, 'viewPimModule')]",
    addEmployeeLink: "//a[text()='Add Employee']",
    employeeListLink: "//a[text()='Employee List']",
    firstNameInput: "//input[@name='firstName']",
    lastNameInput: "//input[@name='lastName']",
    employeeIdInput: "//label[text()='Employee Id']/../following-sibling::div//input",
    
    createLoginDetailsToggle: "//div[@class='oxd-switch-wrapper']//span",
    usernameEntryInput: "//label[text()='Username']/../following-sibling::div//input",
    saveButton: "//button[@type='submit']",

    employeeIdSearchInput: "//label[text()='Employee Id']/../following-sibling::div//input",
    searchButton: "//button[@type='submit']",
    resetButton: "//button[normalize-space()='Reset']",

    userRowById: (id) => `//div[@role='row' and .//div[contains(text(), '${id}')]]`,
    
    deleteButtonById: (id) => `//div[@role='row' and .//div[contains(text(), '${id}')]]//i[contains(@class, 'bi-trash')]`,
    confirmDeleteButton: "//button[contains(@class, 'oxd-button--label-danger')]",
  },

  async login(username, password) {
    await I.amOnPage('/web/index.php/auth/login');
    await I.waitForVisible(this.locators.usernameInput, 30);
    await I.fillField(this.locators.usernameInput, username);
    await I.fillField(this.locators.passwordInput, password);
    await I.click(this.locators.loginButton);
    await I.waitForVisible(this.locators.pimMenuLink, 30);
  },

  async goToAddEmployeePage() {
    await I.click(this.locators.pimMenuLink);
    await I.waitForVisible(this.locators.addEmployeeLink, 30);
    await I.click(this.locators.addEmployeeLink);
    await I.waitForVisible(this.locators.firstNameInput, 30);
  },

  async fillEmployeeForm(employeeData) {
    await I.fillField(this.locators.firstNameInput, employeeData.firstName);
    await I.fillField(this.locators.lastNameInput, employeeData.lastName);

    await I.waitForVisible(this.locators.employeeIdInput, 10);
    
    await I.click(this.locators.employeeIdInput);
    await I.pressKey(['Control', 'a']); 
    await I.pressKey('Backspace');
    await I.wait(0.5);

    await I.fillField(this.locators.employeeIdInput, employeeData.employeeId);

    await I.click(this.locators.createLoginDetailsToggle);
    await I.waitForVisible(this.locators.usernameEntryInput, 15);
    
    await I.fillField(this.locators.usernameEntryInput, employeeData.email);
    await I.fillField("//label[text()='Password']/../following-sibling::div//input", "Test@1234");
    await I.fillField("//label[text()='Confirm Password']/../following-sibling::div//input", "Test@1234");

    await I.click(this.locators.saveButton);
    
    try {
        await I.waitForText("Successfully Saved", 60);
    } catch (e) {
    }
    await I.wait(5); 
  },

  async searchForEmployee(employeeId) {
    await I.click(this.locators.pimMenuLink); 
    await I.click(this.locators.employeeListLink);
    
    await I.waitForVisible(this.locators.resetButton, 30);
    await I.click(this.locators.resetButton);
    await I.wait(2); 

    await I.fillField(this.locators.employeeIdSearchInput, employeeId);
    await I.click(this.locators.searchButton);
    
    await I.waitForElement(this.locators.userRowById(employeeId), 20);
  },

  async verifyEmployeeDataWithGrab(expectedName, expectedId) {
    const rowLocator = this.locators.userRowById(expectedId);
    
    await I.waitForElement(rowLocator, 20);
    const rowText = await I.grabTextFrom(rowLocator);

    expect(rowText).to.include(expectedName);
    expect(rowText).to.include(expectedId);
  },

  async deleteEmployee(employeeId) {
    const deleteIcon = this.locators.deleteButtonById(employeeId);
    
    try {
        await I.wait(2);
        const num = await I.grabNumberOfVisibleElements(deleteIcon);
        if (num > 0) {
            await I.click(deleteIcon);
            await I.waitForVisible(this.locators.confirmDeleteButton, 10);
            await I.click(this.locators.confirmDeleteButton);
            
            await I.waitForText("Successfully Deleted", 10);
            
            await I.wait(2);
            await I.dontSee(employeeId);
        }
    } catch (e) {
    }
  }
};