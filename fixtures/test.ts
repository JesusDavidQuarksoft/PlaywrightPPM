import { test as base } from '@playwright/test';
import { HeaderComponent } from '@pages/header.component';
import { LoginPage } from '@pages/login.page';
// Se define un tipo de fixture que contiene la instancia de HeaderComponent
type Fixtures = {
    headerComponent: HeaderComponent;
    loginPage: LoginPage;

}
// Se extiende la instancia de test para incluir el fixture de HeaderComponent
export const test = base.extend<Fixtures>({
    headerComponent: async ({ page }, use) => {
        const header = new HeaderComponent(page);
        await use(header);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    }
});

// Se usa export { test } para que los tests puedan importar la instancia de test con los fixtures extendidos
export { expect } from '@playwright/test';