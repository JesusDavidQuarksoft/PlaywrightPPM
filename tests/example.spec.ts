import { test } from '../fixtures/test';

test('has title', async ({ homePage }) => {
  await homePage.navigate();
  await homePage.verifyTitle();
});

test('get started link', async ({ homePage }) => {
  await homePage.navigate();
  await homePage.clickGetStarted();
  await homePage.verifyInstallationHeadingIsVisible();
});
