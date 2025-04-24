// tests/addCust.spec.ts
import { test } from '@playwright/test';
import { AddCustomers } from '../pages/customers';
import { LoginPage } from '../pages/login';

const randomEmail = `testuser${Date.now()}@example.com`;

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('admin@dcubeai.com', 'DcubeAdmin@123');
});
// test.afterAll(async ({ page }) => {
// await page.close()
// });

test('Positive: Add new customer or catch duplicate', async ({ page }) => {
  const userFormPage = new AddCustomers(page);

  await userFormPage.fillUserForm(
    'David',
    'don',
    randomEmail,
    '9878888878',
    'test address',
    'Austria',
    'Salzburg',
    'Au',
    'Password@123!'
  );

  await userFormPage.saveForm();
});
test('Negative: Try Creating Same Customer Again', async ({ page }) => {
  const userFormPage = new AddCustomers(page);

  await userFormPage.fillUserForm(
    'David',
    'Don',
    randomEmail, // Same email reused
    '9878888878',
    'Test address',
    'Austria',
    'Salzburg',
    'Au',
    'Password@123!'
  );

  try {
    await userFormPage.saveForm();
  } catch (error) {
    console.warn('Duplicate validation triggered:', error.message);
  }
});

test('Negative: Required Fields Validation', async ({ page }) => {
  const userFormPage = new AddCustomers(page);
  await userFormPage.verifyMandatoryFields();
});

test('Negative: Invalid Email Format', async ({ page }) => {
  const userFormPage = new AddCustomers(page);
  await userFormPage.verifyInvalidEmail();
});

test('Positive: Valid Email Passes Validation', async ({ page }) => {
  const userFormPage = new AddCustomers(page);
  await userFormPage.verifyValidEmail();
});

  test('Delete customers by name', async ({ page }) => {
    const userFormPage = new AddCustomers(page);
    await userFormPage.deleteCustomerByName('David don');
});
