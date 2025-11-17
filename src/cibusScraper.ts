import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

export interface CibusScraperOptions {
  username: string;
  password: string;
  company: string;
}

export interface CibusScraperResult {
  balance: number;
}

@Injectable()
export class CibusScraperService {
  async scrap({
    username,
    password,
    company,
  }: CibusScraperOptions): Promise<CibusScraperResult> {
    return new Promise<CibusScraperResult>(async (resolve, reject) => {
      console.log('Start scrapping Cibus...');
      const browser = await puppeteer.launch({
        headless: false,
      });
      const page = await browser.newPage();
      await page.setViewport({
        width: 1920,
        height: 1080,
      });
      await page.goto('https://consumers.pluxee.co.il/login');
      await page.waitForSelector('#user');
      await page.type('#user', username);

      await page.waitForSelector('.login-btn-container button');
      await page.click('.login-btn-container button');

      await page.waitForSelector('#password');
      await page.type('#password', password);

      await page.waitForSelector('#company-inp');
      await page.type('#company-inp', company);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const isResolved = { value: false };

      page.on('response', async (response) => {
        if (
          response
            .url()
            .includes(
              'https://api.consumers.pluxee.co.il/api/prx_user_info.py',
            ) &&
          response.request().method() === 'GET' &&
          response.status() === 200 &&
          !isResolved.value
        ) {
          const data = await response.json();
          console.log({ cibusData: data }, 'Got data from Cibus');
          // browser.close(); // Keep browser open
          isResolved.value = true;
          resolve({ balance: Number.parseFloat(data.budget) });
        }
      });

      // Timeout for the case that the response event is not triggered
      setTimeout(() => {
        if (isResolved.value) {
          return;
        }

        console.error('Timeout reached, no response from Cibus');
        // browser.close(); // Keep browser open
        reject(new Error('Timeout reached, no response from Cibus'));
      }, 15000);

      // Login
      await page.waitForSelector('.login-btn-container button');
      await page.click('.login-btn-container button');
    });
  }
}
