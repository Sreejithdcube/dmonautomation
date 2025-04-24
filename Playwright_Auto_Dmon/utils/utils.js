import { expect } from '@playwright/test';

export async function checkMandatoryFieldValidations(page) {
  await page.getByRole('button', { name: 'Save' }).click();
  const requiredFields = [
    'First Name is required',
    'Last Name is required',
    'Email is required',
    'Phone Number is required',
    'Address 1 is required',
    'Password is required',
  ];
  for (const errorMessage of requiredFields) {
    const errorLocator = page.locator(`text=${errorMessage}`);
    await expect(errorLocator).toBeVisible();
  }
}

export async function checkPasswordValidation(page) {
  const passwordTests = [
    { password: '12345', message: 'Password must be at least 8 characters long' },
    { password: '123452223', message: 'Password must contain at least one number, one special character, and one letter' },
    { password: 'Password!', message: 'Password must contain at least one number, one special character, and one letter' },
    { password: 'Password1', message: 'Password must contain at least one number, one special character, and one letter' },
    { password: '12345678!', message: 'Password must contain at least one number, one special character, and one letter' },
  ];

  for (const test of passwordTests) {
    await page.getByRole('textbox', { name: 'Password' }).fill(test.password);
    await page.getByRole('button', { name: 'Save' }).click();
    const errorLocator = page.locator(`text=${test.message}`);
    await expect(errorLocator).toBeVisible();
  }
}