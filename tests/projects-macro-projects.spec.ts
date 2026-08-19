import { test, expect } from "@playwright/test";
import { ProjectsMacroProjectsPage } from "../pages/projects-macro-projects.page";

test.describe("Navegación y Macroproyectos - Portal Proyectos México", () => {
  test("Debe navegar a Macroproyectos, abrir el primer elemento y validar la nueva ventana", async ({
    page,
  }) => {
    const projectsMacroPage = new ProjectsMacroProjectsPage(page);

    await projectsMacroPage.navigate();

    await projectsMacroPage.goToProjects();

    await expect(page).toHaveURL(/.*public/);

    await projectsMacroPage.goToMacroProjectsTab();

    const newTab = await projectsMacroPage.openFirstMacroProject();

    await expect(
      newTab.getByRole("heading", { name: "Macroproyecto" }),
    ).toBeVisible();

    await newTab.close();
  });
});
