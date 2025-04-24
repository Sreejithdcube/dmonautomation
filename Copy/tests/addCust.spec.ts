// tests/userFormTest.spec.ts
import { test, expect } from '@playwright/test';
import { AddCustomers } from '../pages/customers';
import { LoginPage } from '../pages/login';

test('Fill User Form Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const userFormPage = new AddCustomers(page);
  await loginPage.goto();
  await loginPage.login('admin@dcubeai.com', 'DcubeAdmin@123');

  await userFormPage.fillUserForm(
    'David',
    'dd@gmail.com',
    '9878888878',
    'test',
    'Austria',
    'Salzburg',
    'Au',
    'Password@123!'
  );

  // Add verification steps if needed
  
  await userFormPage.saveForm();
});
test('Negative Test Cases - Customer Form', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const addCustomers = new AddCustomers(page);
  
    // Step 1: Login
    await loginPage.goto();
    await loginPage.login('admin@dcubeai.com', 'DcubeAdmin@123');
  
    // Negative Test 1: Try submitting without filling required fields
    await addCustomers.verifyMandatoryFields();
  
    // Negative Test 2: Try submitting with an invalid email format
    await addCustomers.verifyInvalidEmail();
  
  });