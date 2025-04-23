import { Page } from '@playwright/test';

export class Devices {
  constructor(private page: Page) { }

  async openDeviceForm() {
    await this.page.locator('#accordionExample').getByText('Devices').click();
    await this.page.getByRole('button', { name: 'add Add' }).click();
  }

  async fillDeviceForm(deviceId: string, alias: string, customerEmail: string) {
    await this.page.getByRole('textbox', { name: 'Device ID' }).fill(deviceId);
    await this.page.getByRole('textbox', { name: 'Alias' }).fill(alias);
    await this.page.locator('select[name="customer_email"]').selectOption(customerEmail);
  }

  async submitForm() {
    await this.page.getByRole('button', { name: 'Save' }).click();
  }
  async gotoDevices() {
    await this.page.locator('#accordionExample').getByText('Devices').click();
  }

  async selectDeviceById(deviceId: string) {
    const row = this.page.getByRole('row', { name: deviceId });
    await row.getByLabel('Toggle select row').check();
  }

  async deleteDeviceById(deviceId: string) {
    // Locate the row by device ID
    const row = this.page.locator(`//td[contains(text(), '${deviceId}')]/parent::tr`);

     // Select the checkbox
  await row.locator('input[aria-label="Toggle select row"]').check();

  // Click the Delete button in the same row
  await row.getByRole('button', { name: 'Delete' }).click();
    }
  }

