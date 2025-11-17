import { Controller, Post, Get } from '@nestjs/common';
import { CibusWoltTransferService } from './cibusWoltTransfer';

@Controller('transfer')
export class TransferController {
  constructor(
    private readonly cibusWoltTransferService: CibusWoltTransferService,
  ) {}

  @Post()
  async transfer() {
    return await this.cibusWoltTransferService.loadExtraBalanceToWolt();
  }

  @Get('health')
  healthCheck() {
    return { status: 'ok', message: 'Transfer service is running' };
  }
}

