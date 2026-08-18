import { test, expect } from '@playwright/test';
import { ProjectsPage } from '../pages/projects.page';

test.describe('Navegación y Filtros Proyectos - Portal Proyectos México', () => {
    // Este Test verifica la navegacion a la sección de Proyectos y en la pestaña de Proyectos Nuevos
    test('Debe filtrar la lista de proyectos al seleccionar Tamaulipas en el mapa', async ({ page }) => {
        test.setTimeout(60000); // Aumenta el tiempo de espera a 60 segundos para este test específico
        const projectsPage = new ProjectsPage(page);
        
        // 1. Navegar a la página principal y entrar a Proyectos
        await projectsPage.navigate();
        await projectsPage.goToProjects();
        await expect(page).toHaveURL(/.*public/);

        // 2. Interactuar con el mapa seleccionando el estado dentro de proyectos nuevos
        await projectsPage.filterByTamaulipas();

        await projectsPage.clearFilters();

        await projectsPage.filterByHidrocarbons();
    });

    test('Seleccionar filtro de Agua y Medio Ambiente y validar la columna Sector', async ({ page }) => {
        test.setTimeout(60000); // Aumenta el tiempo de espera a 60 segundos para este test específico
        const projectsPage = new ProjectsPage(page);
        
        // Navegar a la página principal y entrar a Proyectos
        await projectsPage.navigate();
        await projectsPage.goToProjects();
        await expect(page).toHaveURL(/.*public/);

        // Aplicar filtro de Agua y Medio Ambiente
        await projectsPage.applyWaterAndEnvironmentFilter();

        // Hacer scroll a la columna Sector para visualizarla
        await projectsPage.scrollToSectorColumn();

        // Validar que la columna Sector muestre "Agua y Medio Ambiente"
        await expect(projectsPage.cellColumnWaterAndEnvironment).toBeVisible();
        
    });
});
