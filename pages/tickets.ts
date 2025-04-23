// tickets.ts (Page Object for Tickets)
import { Page, expect } from '@playwright/test';

export class TicketsPage {
    constructor(private page: Page) { }

    // Locators
    private get raiseTicketsTab() {
        return this.page.getByText('Raise Tickets');
    }

    private get addButton() {
        return this.page.getByRole('button', { name: 'add Add' });
    }

    private get deviceDropdown() {
        return this.page.locator('select[name="device_id"]');
    }

    private get subjectInput() {
        return this.page.getByRole('textbox', { name: 'Subject' });
    }

    private get descriptionInput() {
        return this.page.getByRole('textbox', { name: 'Description' });
    }

    private get createTicketButton() {
        return this.page.getByRole('button', { name: 'Create Ticket' });
    }

    // Actions
    async selectDevice(deviceName: string) {
        await this.deviceDropdown.selectOption({ label: deviceName });
    }
    async raiseTicket(subject: string, description: string, deviceName: string) {
        await expect(this.page.getByText('Dashboard')).toBeVisible();
        await this.raiseTicketsTab.click();
        await this.page.waitForTimeout(1000);
        await this.addButton.click();
        await this.page.waitForTimeout(1000);
        await this.selectDevice(deviceName);
        await this.subjectInput.fill(subject);
        await this.descriptionInput.fill(description);
        await this.createTicketButton.click();
    }
}
