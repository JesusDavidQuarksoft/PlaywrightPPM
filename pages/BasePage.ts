import { Page } from '@playwright/test';

// Este codigo define una clase abstracta BasePage que sirve como base para todas las páginas de la aplicación web. Contiene un constructor que recibe un objeto Page de Playwright y lo asigna a una propiedad protegida llamada page. Además, proporciona un método reload() que recarga la página actual utilizando el método reload() del objeto Page. Esta clase se puede extender para crear páginas específicas con funcionalidades adicionales.

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async reload(): Promise<void> {
    await this.page.reload();
  }
}