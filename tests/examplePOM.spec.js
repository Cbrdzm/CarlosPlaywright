const { test, expect } = require("@playwright/test");
const { LoginPage } = require('../POM/LoginPage');

test('Test with POM', async ({page}) => {

    const email = 'anshika@gmail.com';
    const password = 'Iamking@000';
    const loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.validLogin(email,password);

})