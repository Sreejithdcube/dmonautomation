import { Page, expect } from '@playwright/test';

export class DashboardPage {
  constructor(private page: Page) {}

  // Locators
  private get dashboardLink() {
    return this.page.locator('div').filter({ hasText: /^Dashboard$/ });
  }

  private get profileTab() {
    return this.page.getByText('Profile');
  }

  private get myDevicesTab() {
    return this.page.getByText('My Devices');
  }

  private get monitoringTab() {
    return this.page.getByText('Monitoring');
  }

  private get reportsTab() {
    return this.page.getByText('Reports');
  }

  private get nodesTab() {
    return this.page.getByText('Nodes');
  }

  private get ticketsTab() {
    return this.page.getByText('Raise Tickets');
  }

  private get notificationTab() {
    return this.page.getByText('Notification');
  }

  private get logoutBtn() {
    return this.page.locator('div').filter({ hasText: /^Logout$/ });
  }

  // Actions
async navigateTabs() {
    await this.dashboardLink.click();
    await expect(this.page.getByText('Dashboard')).toBeVisible();
  
    await this.profileTab.click();
    await expect(this.page.locator('span.link_name', { hasText: 'Profile' })).toBeVisible();
  
    await this.myDevicesTab.click();
    await expect(this.page.locator('span.link_name', { hasText: 'My Devices' })).toBeVisible();
  
    await this.monitoringTab.click();
    await expect(this.page.getByText('Monitoring')).toBeVisible(); 
  
    await this.reportsTab.click();
    await expect(this.page.locator('span.link_name', { hasText: 'Reports' })).toBeVisible();
  
    await this.nodesTab.click();
    await expect(this.page.locator('span.link_name', { hasText: 'Nodes' })).toBeVisible();
  
    await this.ticketsTab.click();
    await expect(this.page.locator('span.link_name', { hasText: 'Raise Tickets' })).toBeVisible();
  
    await this.notificationTab.click();
    await expect(this.page.locator('span.link_name', { hasText: 'Notification' })).toBeVisible();
  
    await this.logoutBtn.click();
    await expect(this.page.locator('span.link_name', { hasText: 'Logout' })).toBeVisible();
  }
  
}
