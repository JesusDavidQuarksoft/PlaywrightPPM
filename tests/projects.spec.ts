import { test, expect } from '@playwright/test';
import { ProjectsPage } from '../pages/projects.page';

/* Este archivo contiene pruebas automatizadas para la pagina de Proyectos del Portal Proyectos Mexico y enfocandose principalmente en la pesytaña de Proyectos Nuevos. */

test.describe('Navegación y Filtros Proyectos - Portal Proyectos México', () => {
    test('Debe filtrar la lista de proyectos al seleccionar Tamaulipas en el mapa', async ({ page }) => {
        test.setTimeout(60000); 
        const projectsPage = new ProjectsPage(page);
        
        // Navegar a la página principal y entrar a Proyectos
        await projectsPage.navigate();
        await projectsPage.goToProjects();
        await expect(page).toHaveURL(/.*public/);

        // Interactuar con el mapa seleccionando el estado dentro de proyectos nuevos
        await projectsPage.filterByTamaulipas();

        await projectsPage.clearFilters();

        await projectsPage.filterByHidrocarbons();
    });

    test('Seleccionar filtro de Agua y Medio Ambiente y validar la columna Sector', async ({ page }) => {
        test.setTimeout(60000); 
        const projectsPage = new ProjectsPage(page);
        
        // Navegar a la página principal y entrar a Proyectos
        await projectsPage.navigate();
        await projectsPage.goToProjects();
        await expect(page).toHaveURL(/.*public/);

        // Aplicar filtro de Agua y Medio Ambiente
        await projectsPage.applyWaterAndEnvironmentFilter();

        // Hacer scroll a la columna Sector para visualizarla
        await projectsPage.scrollToSectorColumnWaterAndEnvironment();

        // Validar que la columna Sector muestre "Agua y Medio Ambiente"
        await expect(projectsPage.cellColumnWaterAndEnvironment).toBeVisible();
        
    });

    test('Seleccionar filtro de Agua y Medio ambiente y validar el dato en el canvas', async ({ page }) => {
        
        test.setTimeout(60000); 
        const projectsPage = new ProjectsPage(page);
        
        // Navegar a la página principal y entrar a Proyectos
        await projectsPage.navigate();
        await projectsPage.goToProjects();
        await expect(page).toHaveURL(/.*public/);

        // Aplicar filtro de Agua y Medio Ambiente
        await projectsPage.applyWaterAndEnvironmentFilter();

        // Validar que el canvas muestre el dato correspondiente a Agua y Medio Ambiente
        await projectsPage.verifyWaterAndEnvironmentTableVisible();
        await expect(projectsPage.verifyWaterAndEnvironmentTable).toBeVisible();

    })
    

    test('Exportar la información que se muestra en la tabla en PDF', async ({ page }) => {
        test.setTimeout(60000); 
        const projectsPage = new ProjectsPage(page);
        // Navegar a la página principal y entrar a Proyectos
        await projectsPage.navigate();
        await projectsPage.goToProjects();
        await expect(page).toHaveURL(/.*public/);

        // Aplicar filtro de Transporte
        await projectsPage.applyTransportFilter();

         // Hacer scroll a la columna Sector para visualizarla
        await projectsPage.scrollToSectorColumnTransport();

        // Validar que la columna Sector muestre "Transporte"
        await expect(projectsPage.cellColumnTransport).toBeVisible();
        
        //  exportar la información que se muestra en la tabla a PDF
        await projectsPage.exportTableToPDF();
    });
    

    test('Exportar la información que se muestra en la tabla en CSV', async ({ page }) => {
        test.setTimeout(60000);
        const projectsPage = new ProjectsPage(page);
        // Navegar a la página principal y entrar a Proyectos
        await projectsPage.navigate();
        await projectsPage.goToProjects();
        await expect(page).toHaveURL(/.*public/);

        // Aplicar filtro de Transporte
        await projectsPage.applyTransportFilter();

         // Hacer scroll a la columna Sector para visualizarla
        await projectsPage.scrollToSectorColumnTransport();

        // Validar que la columna Sector muestre "Transporte"
        await expect(projectsPage.cellColumnTransport).toBeVisible();
        
        //  exportar la información que se muestra en la tabla a CSV
        await projectsPage.exportTableToCSV();
    });

    test('Verificar que los botones de la paginacion de la tabla se muestren y funcionen correctamente', async ({ page }) => {
        test.setTimeout(60000);
        const projectsPage = new ProjectsPage(page);
        
        // Navegar a la página principal y entrar a Proyectos
        await projectsPage.navigate();
        await projectsPage.goToProjects();
        await expect(page).toHaveURL(/.*public/);

        await projectsPage.verifyPaginationFunctionality();
    });
    
});
