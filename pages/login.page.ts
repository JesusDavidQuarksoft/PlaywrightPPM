import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usuarioInput: Locator;
  readonly contrasenaInput: Locator;
  readonly iniciarSesionBtn: Locator;
  readonly menuInicio: Locator;
    readonly inicioFallido: Locator;

  constructor(page: Page) {
    super(page);
    // ¿Cómo inicializarías estos tres elementos usando tus nuevos selectores?
    this.usuarioInput = page.getByRole('textbox', { name: 'Usuario' });
    this.contrasenaInput = page.getByRole('textbox', { name: 'Contraseña' }); 
    this.iniciarSesionBtn = page.getByRole('button', { name: 'Iniciar sesión' }); 
    this.menuInicio = page.getByLabel('Admin navigation').getByRole('link', { name: 'Inicio' });
    this.inicioFallido = page.getByText('¡El inicio de sesión ha fallado! Por favor, revise las credenciales e intente');
  }

  async navigate(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(usuario: string, contrasena: string): Promise<void> {
    await this.usuarioInput.fill(usuario);
    await this.contrasenaInput.fill(contrasena);
    await this.iniciarSesionBtn.click();
  }
}