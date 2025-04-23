import { test } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { DashboardPage } from '../pages/DashboardPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('robin123@gmail.com', 'Cust_Password@#1234');
});

test('Dashboard Tabs Navigation and Logout', async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.navigateTabs();
});
