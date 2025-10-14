const { I } = inject();

module.exports = {

  fields: {
    emailInput: '#email',
    passwordInput: { xpath: '//input[@id="pass"]' },
  },
  buttons: {
    loginBtn: 'button[name="login"]',
  },

  messages: {
    errorMsg: 'div._9ay7',
  },
  async openLoginPage() {
    await I.amOnPage('https://www.facebook.com');
  },
  async fillEmail(email) {
    await I.fillField(this.fields.emailInput, email);
  },
  async fillPassword(password) {
    await I.fillField(this.fields.passwordInput, password);
  },

  async clickLogin() {
    await I.click(this.buttons.loginBtn);
  },

  async readErrorMessage() {
    await I.waitForElement(this.messages.errorMsg, 40);
    return await I.grabTextFrom(this.messages.errorMsg);
  },

  async readTitle() {
    return await I.grabTitle();
  },

  async login(email, password) {
    await this.openLoginPage();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLogin();
  }
};
