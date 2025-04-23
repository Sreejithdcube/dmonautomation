import { test } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { Devices } from '../pages/devices';
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('admin@dcubeai.com', 'DcubeAdmin@123');
});
test('Create Device in DMON', async ({ page }) => {
  const devicePage = new Devices(page);
  await devicePage.openDeviceForm();
  await devicePage.fillDeviceForm('1233', 'test222', 'sreejithteck@gmail.com');
  await devicePage.submitForm();
});
test('Delete a specific device by ID', async ({ page }) => {
  
  const devicePage = new Devices(page);
  await devicePage.gotoDevices();
  await devicePage.deleteDeviceById('1233');
});