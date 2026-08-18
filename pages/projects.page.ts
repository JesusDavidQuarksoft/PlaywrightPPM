import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProjectsPage extends BasePage {
    readonly projectsLink: Locator;
    readonly tamaulipasStateMap: Locator;
    readonly clearFiltersBtn: Locator;
    readonly filterHidrocarbonsTable: Locator;
    readonly filterButtonTable: Locator;
    readonly sectorCheckbox: Locator;
    readonly waterAndEnvironmentCheckbox: Locator;
    readonly cellColumnWaterAndEnvironment: Locator;

    constructor(page: Page) {
        super(page);
        this.projectsLink = page.getByLabel('Main navigation').getByRole('link', { name: 'Proyectos' });
        this.tamaulipasStateMap = page.locator('#jqvmap3_tam'); 
        this.clearFiltersBtn = page.getByRole('button', { name: 'Limpiar filtros' }).first();
        this.filterHidrocarbonsTable = page.locator('canvas');
        this.filterButtonTable = page.getByRole('button', { name: ' Filtros' });
        this.sectorCheckbox = page.getByRole('checkbox', { name: 'Sector', exact: true });
        this.waterAndEnvironmentCheckbox = page.getByRole('checkbox', { name: 'Agua y Medio Ambiente' });
        this.cellColumnWaterAndEnvironment = page.getByRole('cell', { name: 'Agua y Medio Ambiente' }).first();
    }

    async navigate(): Promise<void> {
        await this.page.goto('/');
    }

    async goToProjects(): Promise<void> {
        await this.projectsLink.click();
    }

    async filterByTamaulipas(): Promise<void> {
        await this.tamaulipasStateMap.click();
        await this.page.waitForTimeout(1000);
    }

    async clearFilters(): Promise<void> {
        await this.clearFiltersBtn.click();
        await this.page.waitForTimeout(1000);
    }

    async filterByHidrocarbons(): Promise<void> {
        await this.filterHidrocarbonsTable.waitFor({ state: 'visible', timeout: 10000 });
        await this.filterHidrocarbonsTable.click({
            position: {
                x: 373,
                y: 63
            }
        });
        await this.page.waitForTimeout(1000);
    }

    async openFilterTable(): Promise<void> {
        await this.filterButtonTable.click();
        await this.page.waitForTimeout(1000);
    }

    async selectSectorCheckbox(): Promise<void> {
        await this.sectorCheckbox.click();
        await this.page.waitForTimeout(1000);
    }

    async selectWaterAndEnvironmentCheckbox(): Promise<void> {
        await this.waterAndEnvironmentCheckbox.click();
        await this.page.waitForTimeout(1000);
    }

    async applyWaterAndEnvironmentFilter(): Promise<void> {
        await this.openFilterTable();
        await this.selectSectorCheckbox();
        await this.selectWaterAndEnvironmentCheckbox();
    }

    async scrollToSectorColumn(): Promise<void> {
        await this.cellColumnWaterAndEnvironment.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
    }

    async validateWaterAndEnvironmentVisible(): Promise<boolean> {
        await this.scrollToSectorColumn();
        return await this.cellColumnWaterAndEnvironment.isVisible();
    }
}