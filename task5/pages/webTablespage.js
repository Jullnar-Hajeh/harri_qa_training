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
    firstRowCells: `(//div[@class='rt-tr-group'])[1]//div[@class='rt-td']`,
    tableBody: `//div[@class='rt-tbody']`,
  },
  

 async goToPage() {
    await I.amOnPage('/webtables');
  },

  openRegistrationForm() {
    I.click(this.locators.addButton);
  },
  
  fillRegistrationForm(user) {
    I.fillField(this.locators.firstNameInput, user.firstName);
    I.fillField(this.locators.lastNameInput, user.lastName);
    I.fillField(this.locators.emailInput, user.email);
    I.fillField(this.locators.ageInput, user.age);
    I.fillField(this.locators.salaryInput, user.salary);
    I.fillField(this.locators.departmentInput, user.department);
  },
  
  submitForm() {
    I.click(this.locators.submitButton);
  },


  addUser(user) {
    this.goToPage();
    this.openRegistrationForm();
    this.fillRegistrationForm(user);
    this.submitForm();
  },


 
 
searchForUser(searchText) {
    
   I.fillField(this.locators.searchBox, searchText);
    

},

async countVisibleDataRows() {
    return count = await I.grabNumberOfVisibleElements(this.locators.dataRows);
  },

  async getFirstRowData() {
    const firstName = await I.grabTextFrom(`${this.locators.firstRowCells}[1]`);
    const lastName = await I.grabTextFrom(`${this.locators.firstRowCells}[2]`);
    const age = await I.grabTextFrom(`${this.locators.firstRowCells}[3]`);
    const email = await I.grabTextFrom(`${this.locators.firstRowCells}[4]`);
    const salary = await I.grabTextFrom(`${this.locators.firstRowCells}[5]`);
    const department = await I.grabTextFrom(`${this.locators.firstRowCells}[6]`);
    
    return { firstName, lastName, age, email, salary, department };
  }
};