import { expect } from '@playwright/test';

export class DeviceActions {
  constructor(page) {
    this.page = page;
    this.deviceMenu = page.locator('#accordionExample').getByText('Devices');
    this.addDeviceButton = page.getByRole('button', { name: 'add Add' });
    this.deviceIdField = page.getByRole('textbox', { name: 'Device ID' });
    this.aliasField = page.getByRole('textbox', { name: 'Alias' });
    this.customerEmailDropdown = page.locator('select[name="customer_email"]');
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async navigateToDevicePage() {
    await this.deviceMenu.click();
  }

  async addDevice({ deviceId, alias, customerEmail }) {
    await this.addDeviceButton.click();
    await this.deviceIdField.fill(deviceId);
    await this.aliasField.fill(alias);
    await this.customerEmailDropdown.selectOption(customerEmail);
    await this.saveButton.click();

    // Verify success message
    const successMessage = this.page.locator('text=Device added successfully');
    await expect(successMessage).toBeVisible({ timeout: 5000 });
    console.log('Device added successfully!');
  }
}
