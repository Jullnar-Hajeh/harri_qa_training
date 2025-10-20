const { I } = inject();

module.exports = {

  locators: {
    dynamicRow: (rowNumber) => `(//div[@class='rt-tr-group'])[${rowNumber}]`,
    firstNameCell: `//div[@class='rt-td'][1]`,
    lastNameCell: `//div[@class='rt-td'][2]`,
    ageCell: `//div[@class='rt-td'][3]`,
    emailCell: `//div[@class='rt-td'][4]`,
    salaryCell: `//div[@class='rt-td'][5]`,
    departmentCell: `//div[@class='rt-td'][6]`,
  },

  async extractUserDataFromRow(userId) {
    const rowLocator = this.locators.dynamicRow(userId);

    const firstName = await I.grabTextFrom(rowLocator + this.locators.firstNameCell);
    const lastName = await I.grabTextFrom(rowLocator + this.locators.lastNameCell);
    const age = await I.grabTextFrom(rowLocator + this.locators.ageCell);
    const email = await I.grabTextFrom(rowLocator + this.locators.emailCell);
    const salary = await I.grabTextFrom(rowLocator + this.locators.salaryCell);
    const department = await I.grabTextFrom(rowLocator + this.locators.departmentCell);
    return {
      name: `${firstName} ${lastName}`,
      age: age,
      email: email,
      salary: salary,
      department: department,
    };
  }
};