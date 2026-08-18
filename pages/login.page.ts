import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;
  readonly homeMenu: Locator;
  readonly loginFailed: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByRole('textbox', { name: 'Usuario' });
    this.passwordInput = page.getByRole('textbox', { name: 'Contraseña' }); 
    this.loginBtn = page.getByRole('button', { name: 'Iniciar sesión' }); 
    this.homeMenu = page.getByLabel('Admin navigation').getByRole('link', { name: 'Inicio' });
    this.loginFailed = page.getByText('¡El inicio de sesión ha fallado! Por favor, revise las credenciales e intente');
  }

  async navigate(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }
}