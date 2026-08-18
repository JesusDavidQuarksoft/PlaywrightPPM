import {test, expect} from '@fixtures/test';

test.describe('Regression - Failed Login', () => {
    test('Should fail login with invalid credentials', async ({ loginPage }) => {
        await loginPage.navigate();
        await loginPage.login('super', 'cuser');
        await expect(loginPage.loginFailed).toBeVisible();
        
    });
});


test.describe('Regression - Successful Login', () => {
    test('Should login with valid credentials', async ({ loginPage }) => {
        await loginPage.navigate();
        await loginPage.login('super', 'user');

        await expect(loginPage.homeMenu).toBeVisible();
        
    });
});