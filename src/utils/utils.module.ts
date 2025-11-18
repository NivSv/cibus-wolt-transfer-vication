import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PuppeteerService } from './puppeteer.service';

@Global()
@Module({
  providers: [PrismaService, PuppeteerService],
  exports: [PrismaService, PuppeteerService],
})
export class UtilsModule {}
