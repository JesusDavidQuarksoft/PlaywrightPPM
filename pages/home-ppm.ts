import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

// Clase que representa la página de inicio de la aplicación
export class HomePage extends BasePage {
  private readonly porqueMexicoLink: Locator;
  private readonly proyectosLink: Locator;
  private readonly comoInvertirLink: Locator;
  private readonly bancoConocimientoLink: Locator;

  constructor(page: Page) {
    super(page);
    this.porqueMexicoLink = page.getByRole('link', { name: '¿Porqué México?' });
    this.proyectosLink = page.getByRole('link', { name: 'Proyectos', exact: true });
    this.comoInvertirLink = page.getByRole('link', { name: '¿Cómo invertir?' });
    this.bancoConocimientoLink = page.getByRole('link', { name: 'Banco del Conocimiento' });
  }

  /**
   * Navega a la raíz configurada en baseURL
   */
  async navigate(): Promise<void> {
    await this.page.goto('/');
  }

  /**
   * Navega hacia la sección de ¿Porqué México?
   */
  async clickPorqueMexico(): Promise<void> {
    await this.porqueMexicoLink.click();
  }
}