import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { connect } from 'puppeteer-real-browser';

@Injectable()
export class PuppeteerService implements OnModuleInit, OnModuleDestroy {
  private browser: any = null;
  private page: any = null;

  async onModuleInit() {
    await this.openBrowser();
  }

  async onModuleDestroy() {
    await this.closeBrowser();
  }

  async openBrowser() {
    if (this.browser) {
      console.log('Browser already opened');
      return;
    }

    const { browser, page } = await connect({
      headless: false,
      args: [],
      customConfig: {},
      turnstile: true,
      connectOption: {},
      disableXvfb: false,
      ignoreAllFlags: false,
      // proxy: {
      //   host: '<proxy-host>',
      //   port: '<proxy-port>',
      //   username: '<proxy-username>',
      //   password: '<proxy-password>'
      // }
    });

    this.browser = browser;
    this.page = page;
    console.log('Browser opened successfully');
  }

  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
      console.log('Browser closed successfully');
    }
  }

  getBrowser() {
    if (!this.browser) {
      throw new Error('Browser is not initialized. Call openBrowser() first.');
    }
    return this.browser;
  }

  getPage() {
    if (!this.page) {
      throw new Error('Page is not initialized. Call openBrowser() first.');
    }
    return this.page;
  }

  async createNewPage() {
    if (!this.browser) {
      throw new Error('Browser is not initialized. Call openBrowser() first.');
    }
    return await this.browser.newPage();
  }

  async navigateTo(url: string): Promise<void> {
    const page = this.getPage();
    await page.goto(url);
  }
}
