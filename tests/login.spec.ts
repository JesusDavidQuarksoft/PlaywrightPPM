import {test, expect} from '@fixtures/test';

test.describe('Inicio de sesión fallido', () => {
    test('No se debe iniciar sesión con credenciales inválidas', async ({ loginPage }) => {
        await loginPage.navigate();
        await loginPage.login('super', 'cuser');
        await expect(loginPage.loginFailed).toBeVisible();
        
    });
});


test.describe('Inicio de sesión exitoso', () => {
    test('Debe iniciar sesión con credenciales válidas', async ({ loginPage }) => {
        await loginPage.navigate();
        await loginPage.login('super', 'user');

        await expect(loginPage.homeMenu).toBeVisible();
        
    });
});