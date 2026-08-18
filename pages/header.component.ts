import { Locator, Page } from "playwright/test";
import { BasePage } from "./BasePage";

export class HeaderComponent extends BasePage {
    readonly languageToggleButton: Locator;
    readonly proyectosLink: Locator;
    readonly porqueMexicoLink: Locator;
    readonly comoInvertirLink: Locator;
    readonly bancoConocimientoLink: Locator;

    constructor(page: Page) {
        super(page);
        this.languageToggleButton = page.getByRole('button', { name: 'Toggle language' });
        // Se usan RegExp para soportar tanto el idioma español como inglés en los nombres de los enlaces
        // Los enlaces están dentro del contenedor con label 'Main navigation'
        const mainNav = page.getByLabel('Main navigation');
        this.proyectosLink = mainNav.getByRole('link', { name: /Proyectos|Projects Hub/i }); 
        this.porqueMexicoLink = mainNav.getByRole('link', { name: /¿Porqué México\?|Why Mexico\?/i });
        this.comoInvertirLink = mainNav.getByRole('link', { name: /¿Cómo invertir\?|How to invest\?/i });
        this.bancoConocimientoLink = mainNav.getByRole('link', { name: /Banco del Conocimiento|Knowledge Bank/i });
    }

    // Navega a la página principal
    async navigate(): Promise<void> {
        await this.page.goto('/');
    }

    // Cambia el idioma de la página haciendo clic en el botón de alternancia de idioma
    async toggleLanguage(): Promise<void> {
        await this.languageToggleButton.click();
    }

    
}