# 🎭 PlaywrightPPM - Automatización de Pruebas E2E

Proyecto de automatización de pruebas end-to-end (E2E) para el **Portal Proyectos México (PPM)** utilizando Playwright y TypeScript.

## 📋 Descripción

Este proyecto contiene un conjunto completo de pruebas automatizadas para validar las funcionalidades principales del Portal Proyectos México, incluyendo:

- Inicio de sesión (exitoso y fallido)
- Navegación entre secciones
- Cambio de idioma (Español/Inglés)
- Filtros de proyectos
- Interacción con mapas interactivos
- Gestión de macroproyectos
- Exportación de datos (PDF/CSV)

## ✨ Características Principales

- ✅ **Patrón Page Object Model (POM)** - Código reutilizable y mantenible
- ✅ **TypeScript** - Tipado fuerte y autocompletado
- ✅ **Fixtures personalizados** - Reutilización de componentes
- ✅ **Reportes HTML** - Visualización detallada de resultados
- ✅ **Trazas de video** - Grabación de todas las pruebas
- ✅ **Configuración CI-ready** - Listo para integración continua

## 📁 Estructura del Proyecto

```
PlaywrightPPM/
├── fixtures/
│   └── test.ts                    # Fixtures personalizados
├── pages/                          # Page Object Models
│   ├── BasePage.ts                # Clase base para todas las páginas
│   ├── header.component.ts        # Componente del header
│   ├── login.page.ts              # Página de login
│   ├── projects.page.ts           # Página de proyectos
│   └── projects-macro-projects.page.ts  # Página de macroproyectos
├── tests/                          # Suite de pruebas
│   ├── header-language.spec.ts    # Pruebas de cambio de idioma
│   ├── login.spec.ts              # Pruebas de inicio de sesión
│   ├── projects.spec.ts           # Pruebas de proyectos y filtros
│   └── projects-macro-projects.spec.ts  # Pruebas de macroproyectos
├── playwright-report/             # Reportes HTML generados
├── test-results/                  # Resultados y capturas
├── playwright.config.ts           # Configuración de Playwright
├── tsconfig.json                  # Configuración de TypeScript
└── package.json                   # Dependencias del proyecto
```

## 🔧 Requisitos Previos

- **Node.js** v16 o superior
- **npm** o **yarn**
- Navegador Chromium (se instala automáticamente con Playwright)

## 📦 Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd PlaywrightPPM
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Instalar navegadores de Playwright:**
   ```bash
   npx playwright install chromium
   ```

## ⚙️ Configuración

El proyecto está configurado para ejecutarse contra un servidor local. Edita `playwright.config.ts` para cambiar la URL base:

```typescript
use: {
  baseURL: 'http://localhost:4200/',  // Cambia según tu entorno
  trace: 'on',      // Habilita trazas
  video: 'on',      // Graba video de todas las pruebas
}
```

## 🚀 Ejecución de Pruebas

### Ejecutar todas las pruebas

```bash
npx playwright test
```

### Ejecutar pruebas en modo UI (interactivo)

```bash
npx playwright test --ui
```

### Ejecutar un archivo específico

```bash
npx playwright test tests/login.spec.ts
```

### Ejecutar pruebas en modo debug

```bash
npx playwright test --debug
```

### Ver el reporte HTML

```bash
npx playwright show-report
```

### Ejecutar con diferentes navegadores

```bash
# Chromium (predeterminado)
npx playwright test --project=chromium

# Firefox (descomentar en playwright.config.ts)
npx playwright test --project=firefox

# WebKit/Safari (descomentar en playwright.config.ts)
npx playwright test --project=webkit
```

## 🏗️ Patrones de Diseño Utilizados

### 1. **Page Object Model (POM)**

Cada página de la aplicación tiene su propia clase que encapsula los localizadores y acciones:

```typescript
export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  
  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByRole('textbox', { name: 'Usuario' });
    this.passwordInput = page.getByRole('textbox', { name: 'Contraseña' });
  }
  
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }
}
```

### 2. **Fixtures Personalizados**

Los fixtures permiten reutilizar componentes comunes en múltiples pruebas:

```typescript
// fixtures/test.ts
export const test = base.extend<Fixtures>({
    headerComponent: async ({ page }, use) => {
        const header = new HeaderComponent(page);
        await use(header);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    }
});
```

Uso en pruebas:

```typescript
test('Prueba con fixture', async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.login('user', 'pass');
});
```

### 3. **BasePage**

Clase abstracta que proporciona funcionalidad común a todas las páginas:

```typescript
export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async reload(): Promise<void> {
    await this.page.reload();
  }
}
```

## 📝 Ejemplos de Uso

### Prueba de Login Exitoso

```typescript
test('Debe iniciar sesión con credenciales válidas', async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.login('super', 'user');
    await expect(loginPage.homeMenu).toBeVisible();
});
```

### Prueba de Cambio de Idioma

```typescript
test('Debe cambiar de Español a Inglés', async ({ headerComponent }) => {
    await headerComponent.navigate();
    await expect(headerComponent.languageToggleButton).toHaveText('English');
    await headerComponent.toggleLanguage();
    await expect(headerComponent.languageToggleButton).toHaveText('Español');
    await expect(headerComponent.proyectosLink).toHaveText('Projects Hub');
});
```

### Prueba de Filtros de Proyectos

```typescript
test('Debe filtrar proyectos por sector', async ({ page }) => {
    const projectsPage = new ProjectsPage(page);
    await projectsPage.navigate();
    await projectsPage.goToProjects();
    await projectsPage.applyWaterAndEnvironmentFilter();
    await expect(projectsPage.cellColumnWaterAndEnvironment).toBeVisible();
});
```

### Prueba de Macroproyectos

```typescript
test('Debe abrir macroproyecto en nueva pestaña', async ({ page }) => {
    const projectsMacroPage = new ProjectsMacroProjectsPage(page);
    await projectsMacroPage.navigate();
    await projectsMacroPage.goToProjects();
    await projectsMacroPage.goToMacroProjectsTab();
    const newPage = await projectsMacroPage.openFirstMacroProject();
    await expect(newPage.getByRole('heading', { name: 'Macroproyecto' })).toBeVisible();
    await newPage.close();
});
```

## 📊 Suite de Pruebas

### 🔐 Login (`login.spec.ts`)
- ✅ Inicio de sesión con credenciales válidas
- ✅ Inicio de sesión fallido con credenciales inválidas

### 🌐 Header y Navegación (`header-language.spec.ts`)
- ✅ Cambio de idioma Español ↔ Inglés
- ✅ Validación de enlaces traducidos

### 🗂️ Proyectos (`projects.spec.ts`)
- ✅ Navegación a la sección de proyectos
- ✅ Filtros por estado (mapa interactivo)
- ✅ Filtros por sector (Agua y Medio Ambiente, Transporte)
- ✅ Filtros por tipo de energía (Hidrocarburos)
- ✅ Exportación de datos a PDF/CSV

### 🏢 Macroproyectos (`projects-macro-projects.spec.ts`)
- ✅ Navegación a macroproyectos
- ✅ Apertura de detalles en nueva pestaña
- ✅ Validación de contenido del macroproyecto

## 🐛 Debugging y Troubleshooting

### Ver trazas de una prueba fallida

```bash
npx playwright show-trace test-results/<nombre-del-test>/trace.zip
```

### Ejecutar solo pruebas fallidas

```bash
npx playwright test --last-failed
```

### Generar código de prueba automáticamente

```bash
npx playwright codegen http://localhost:4200
```

## 📈 Reportes

Después de ejecutar las pruebas, se genera automáticamente un reporte HTML en `playwright-report/index.html` que incluye:

- ✅ Resumen de pruebas pasadas/fallidas
- 📹 Videos de las ejecuciones
- 📸 Capturas de pantalla en caso de fallos
- 🔍 Trazas detalladas de cada paso
- ⏱️ Tiempos de ejecución

## 🔄 Integración Continua (CI)

El proyecto está configurado para CI. Las pruebas se ejecutarán con:
- **Reintentos**: 2 intentos en caso de fallo
- **Workers**: 1 worker (ejecución secuencial en CI)
- **Reporter**: HTML con capturas y trazas

Variables de entorno CI detectadas automáticamente.

## 📚 Recursos Adicionales

- [Documentación de Playwright](https://playwright.dev/)
- [Guía de Page Object Model](https://playwright.dev/docs/pom)
- [Locators Best Practices](https://playwright.dev/docs/locators)
- [Test Fixtures](https://playwright.dev/docs/test-fixtures)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-prueba`)
3. Commit tus cambios (`git commit -m 'Agrega nueva prueba'`)
4. Push a la rama (`git push origin feature/nueva-prueba`)
5. Abre un Pull Request

## 📄 Licencia

ISC

## 👥 Autor

Portal Proyectos México - Equipo de QA

---

**Última actualización:** Agosto 2026
