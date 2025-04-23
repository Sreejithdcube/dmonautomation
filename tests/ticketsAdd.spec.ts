// ticketsAdd.spec.ts
import { test } from '@playwright/test';
import { TicketsPage } from '../pages/tickets';
import { LoginPage } from '../pages/login';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('robin123@gmail.com', 'Cust_Password@#1234');
  });
  
test('Create ticket from Raise Tickets section', async ({ page }) => {
 
    const ticketsPage = new TicketsPage(page);
    await ticketsPage.raiseTicket('Leakage Issue',
    'Water leakage detected near the booster pump area. Needs urgent inspection.',
    'DCUBE IoT S3-1');
});
