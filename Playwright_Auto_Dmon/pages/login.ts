import { Page, expect } from '@playwright/test';

export class LoginPage {
  private page: Page;

  // Constructor //Constructor that will be automatically called as soon as the object of the class is created
  constructor(page: Page) {
    this.page = page;
  }

  // Locators - Moved inside methods to avoid initialization issues
  private get usernameInput() {
    return this.page.getByRole('textbox', { name: 'Enter your username here *' });
  }

  private get passwordInput() {
    return this.page.getByRole('textbox', { name: 'Enter your password here *' });
  }

  private get loginButton() {
    return this.page.getByRole('button', { name: 'Login' });
  }

  // Actions
  async goto(): Promise<void> {
    await this.page.goto(('https://dmon.dcubeai.com/'),{ timeout: 30000 });
  }

  async login(username: string, password: string): Promise<void> {
    await expect(this.usernameInput).toBeVisible({ timeout: 30000 });
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
