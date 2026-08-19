import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProjectsMacroProjectsPage extends BasePage {
    readonly projectsLink: Locator;
    readonly macroProjectsButton: Locator;
    readonly firstGalleryItemLink: Locator;

    constructor(page: Page) {
        super(page);
        this.projectsLink = page.getByLabel('Main navigation').getByRole('link', { name: 'Proyectos' });
        
        this.macroProjectsButton = page.getByRole('button', { name: 'MACROPROYECTOS Y PROGRAMAS' });
        this.firstGalleryItemLink = page.locator('.gallery-item > a').first();
    }

    async navigate(): Promise<void> {
        await this.page.goto('/');
    }

    async goToProjects(): Promise<void> {
        await this.projectsLink.click();
        await this.macroProjectsButton.waitFor({ state: 'visible' });
    }

    async goToMacroProjectsTab(): Promise<void> {
        await this.macroProjectsButton.click();
        await this.firstGalleryItemLink.waitFor({ state: 'visible' });
    }

    async openFirstMacroProject(): Promise<Page> {
        const pagePromise = this.page.waitForEvent('popup');
        
        await this.firstGalleryItemLink.click();
        
        // Declaramos la variable newPage para capturar la nueva ventana emergente
        const newPage = await pagePromise;

        // Esperamos a que el título principal de la nueva página sea visible
        await newPage.getByRole('heading', { name: 'Macroproyecto' }).waitFor({ state: 'visible' });

        // Retornamos la nueva página para que el archivo .spec.ts pueda hacer aserciones sobre ella
        return newPage; 
    }
}