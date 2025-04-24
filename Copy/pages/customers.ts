// pages/UserFormPage.ts
import { expect, Page } from '@playwright/test';

export class AddCustomers{
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators - Using getters to avoid initialization issues
  private get addButton() {
    return this.page.locator('.button-common.button-icon.primary');
  }

  private get firstNameInput() {
    return this.page.locator('#formFirstName');
  }

  private get emailInput() {
    return this.page.getByRole('textbox', { name: 'Email' });
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
    return this.page.getByRole('button', { name: 'Save' });
  }
  private get validationErrors() {
    return {
        firstName: this.page.locator('.invalid-feedback', { hasText: 'First name is required' }),
        lastName: this.page.locator('.invalid-feedback', { hasText: 'Last name is required' }),
        email: this.page.locator('.invalid-feedback', { hasText: 'Email is required' }),
        address: this.page.locator('.invalid-feedback', { hasText: 'Address 1 is required' }),
        phone: this.page.locator('.invalid-feedback', { hasText: 'Phone number is required' }),
        password: this.page.locator('.invalid-feedback', { hasText: 'Password is required' }),
    };
}

  // Actions
  async fillUserForm(
    firstName: string,
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
    await this.emailInput.fill(email);
    await this.phoneNumberInput.fill(phone);
    await this.addressInput.fill(address);
    await this.countrySelect.selectOption(country);
    await this.stateSelect.selectOption(state);
    await this.citySelect.selectOption(city);
    await this.passwordInput.fill(password);
    
  }

  async saveForm() {
    await this.saveButton.click();

  }
  // **Negative Test Cases**
  
  async verifyMandatoryFields() {
    await this.addButton.click();
    await this.saveButton.click();
    await expect(this.validationErrors.firstName).toBeVisible();
    await expect(this.validationErrors.lastName).toBeVisible();
    await expect(this.validationErrors.email).toBeVisible();
    await expect(this.validationErrors.phone).toBeVisible();
    await expect(this.validationErrors.address).toBeVisible();
  }
  async verifyInvalidEmail() {
    await this.addButton.click();
    await this.emailInput.fill('invalid-email');
    await this.saveButton.click();
    await expect(this.validationErrors.email).toBeVisible();
  }

  async verifyInvalidPhoneNumber() {
    await this.addButton.click();
    await this.phoneNumberInput.fill('123');
    await this.saveButton.click();
    await expect(this.validationErrors.phone).toBeVisible();
  }

}

