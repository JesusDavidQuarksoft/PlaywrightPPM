import {test, expect} from '@fixtures/test';

test.describe('Regresion - Inicio de sesion erroneo', () => {
    test('Debe iniciar sesión con credenciales inválidas', async ({ loginPage }) => {
        await loginPage.navigate();
        await loginPage.login('super', 'cuser');
        await expect (loginPage.inicioFallido).toBeVisible();
        
    });
});


test.describe('Regresión - Inicio de sesión', () => {
    test('Debe iniciar sesión con credenciales válidas', async ({ loginPage }) => {
        await loginPage.navigate();
        await loginPage.login('super', 'user');

        await expect(loginPage.menuInicio).toBeVisible();
        
    });
});