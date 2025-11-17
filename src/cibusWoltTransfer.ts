import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CibusScraperService } from './cibusScraper';

@Injectable()
export class CibusWoltTransferService {
  constructor(
    private readonly cibusScraperService: CibusScraperService,
    private readonly configService: ConfigService,
  ) {
    console.log('CibusWoltTransferService initialized');
  }

  async loadExtraBalanceToWolt() {
    const cibusData = await this.cibusScraperService.scrap({
      username: this.configService.get<string>('CIBUS_USERNAME'),
      password: this.configService.get<string>('CIBUS_PASSWORD'),
      company: this.configService.get<string>('CIBUS_COMPANY'),
    });
    console.log('Cibus data:', cibusData);
    return cibusData;
  }
}
