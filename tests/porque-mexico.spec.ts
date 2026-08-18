import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home-ppm';

test.describe('Navegación Header - Portal Proyectos México', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('Debe redirigir a la sección de ¿Porqué México?', async ({ page }) => {
    await homePage.clickPorqueMexico();
    
    // Valida que la URL cambie hacia la ruta correspondiente
    await expect(page).toHaveURL(/.*porque-mexico/);
  });
});