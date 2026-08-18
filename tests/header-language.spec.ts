import { test, expect } from '@fixtures/test';
import { HeaderComponent } from '@pages/header.component';

test.describe('Regresión - Cambio de idioma', () => {

    test.beforeEach(async ({ headerComponent }) => {
    await headerComponent.navigate();     
    });
    // Test que verifica el cambio de idioma dentro del header de la página
    test('Debe iniciar en Español y al cambiar el idioma debe mostrar los enlaces en Inglés', async ({ headerComponent }) => {
        await expect(headerComponent.languageToggleButton).toHaveText('English');
        await expect(headerComponent.proyectosLink).toHaveText('Proyectos');
        await expect(headerComponent.porqueMexicoLink).toHaveText('¿Porqué México?');
        // Se cambia el idioma
        await headerComponent.toggleLanguage();
        // Se verifica que los enlaces cambien al idioma inglés
        await expect(headerComponent.languageToggleButton).toHaveText('Español');
        await expect(headerComponent.proyectosLink).toHaveText('Projects Hub');
        await expect(headerComponent.porqueMexicoLink).toHaveText('Why Mexico?');
        // Se realiza nuevamente el cambio de idioma para volver al español
        await headerComponent.toggleLanguage();
        // Se verifica que los enlaces regresen al idioma español
        await expect(headerComponent.languageToggleButton).toHaveText('English');
        await expect(headerComponent.proyectosLink).toHaveText('Proyectos');
      
    })
});