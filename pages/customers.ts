// pages/customers.ts
import { expect, Page } from '@playwright/test';

export class AddCustomers {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  private get addButton() {
    return this.page.locator('button.button-common.button-icon.primary');
  }

  private get firstNameInput() {
    return this.page.locator('#formFirstName');
  }
  private get LastNameInput() {
    return this.page.locator('#formLastName');
  }
  private get emailInput() {
    return this.page.locator('#formEmail');
  }

  private get phoneNumberInput() {
    return this.page.getByRole('textbox', { name: 'Phone Number' });
  }

  private get addressInput() {
    return this.page.getByRole('textbox', { name: 'Address 1 Address' });
  }

  private get countrySelect() {
    return this.page.locator('select[name="country"]');
  }

  private get stateSelect() {
    return this.page.locator('select[name="state"]');
  }

  private get citySelect() {
    return this.page.locator('select[name="city"]');
  }

  private get passwordInput() {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  private get saveButton() {
    return this.page.locator('button[type="submit"]');
  }

  //private get closeButton() {
  // return this.page.locator('button[type="button"]');
  // }
  private get duplicateCustomerError() {
    return this.page.getByRole('status', { name: 'Customer already exists' });
  }

  private get validationErrors() {
    return {
      firstName: this.page.locator('.invalid-feedback', { hasText: 'First name is required' }),
      lastName: this.page.locator('.invalid-feedback', { hasText: 'Last name is required' }),
      emailRequired: this.page.locator('.invalid-feedback', { hasText: 'Email is required' }),
      emailInvalid: this.page.locator('#formEmail ~ .invalid-feedback'),
      address: this.page.locator('.invalid-feedback', { hasText: 'Address 1 is required' }),
      phone: this.page.locator('.invalid-feedback', { hasText: 'Phone number is required' }),
      password: this.page.locator('.invalid-feedback', { hasText: 'Password is required' }),
    };
  }

  // Actions
  async navigateAndOpenForm() {
    await this.page.reload();
    await this.addButton.click();
  }

  async fillUserForm(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: string,
    country: string,
    state: string,
    city: string,
    password: string
  ) {
    await this.addButton.click();
    await this.firstNameInput.fill(firstName);
    await this.LastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.phoneNumberInput.fill(phone);
    await this.addressInput.fill(address);
    await this.countrySelect.selectOption(country);
    await this.stateSelect.selectOption(state);
    await this.citySelect.selectOption(city);
    await this.passwordInput.fill(password);
  }

  async saveForm(): Promise<void> {
    await this.saveButton.click();


    // Wait a bit to see if the error appears
    await this.page.waitForTimeout(1000);

    const errorVisible = await this.duplicateCustomerError.isVisible().catch(() => false);
    if (errorVisible) {
      console.warn('Customer already exists – skipping save.');
      throw new Error('Customer already exists');
    }
  }

  // Email Validation Methods
  async verifyInvalidEmail(): Promise<void> {
    await this.navigateAndOpenForm();
    await this.emailInput.fill('invalid-email');
    await this.saveForm();

    await expect(this.emailInput).toHaveClass(/is-invalid/);
    await expect(this.validationErrors.emailInvalid).toHaveText('Invalid email address');
  }

  async verifyValidEmail(): Promise<void> {
    await this.navigateAndOpenForm();
    await this.emailInput.fill('valid.email@example.com');
    await this.saveForm();

    await expect(this.emailInput).not.toHaveClass(/is-invalid/);
    await expect(this.validationErrors.emailInvalid).toBeHidden();
  }

  // Required Field Checks / Abstraction
  async verifyMandatoryFields(): Promise<void> {
    await this.addButton.click();
    await this.saveButton.click();
    await expect(this.validationErrors.firstName).toBeVisible();
    await expect(this.validationErrors.lastName).toBeVisible();
    await expect(this.validationErrors.emailRequired).toBeVisible();
    await expect(this.validationErrors.phone).toBeVisible();
    await expect(this.validationErrors.address).toBeVisible();
  }

  async verifyInvalidPhoneNumber(): Promise<void> {
    await this.navigateAndOpenForm();
    await this.phoneNumberInput.fill('123456');
    await this.saveButton.click();
    await expect(this.validationErrors.phone).toBeVisible();
  }
  async deleteCustomerByName(name: string) {
   // Locate the table row that contains the customer's name
   const row = this.page.locator(`//tr[td[text()="David don"]]`);
   await row.locator('input[type="checkbox"][aria-label="Toggle select row"]').first().check();
   await row.locator('button.button-common.button-icon.secondary:has(div >> text=Delete)').click();
   // Confirm deletion in modal
   const confirmDeleteButton = this.page.locator('button.button-common.button-icon.secondary:has(div >> text=Delete)');
   //await confirmDeleteButton.waitFor({ state: 'visible' });
   await confirmDeleteButton.click();
 }
}
