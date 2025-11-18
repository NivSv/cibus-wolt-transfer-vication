import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { z } from 'zod';

@Injectable()
export class ConfigService {
  private envCache: NodeJS.ProcessEnv;

  constructor() {
    expand(config());
    this.envCache = process.env;

    const environmentVariablesSchema = z.object({
      PORT: z.number().or(z.string()),
      SMS_SERVICE_ACCESS_KEY: z.string(),
    });

    environmentVariablesSchema.parse(this);
  }

  get PORT(): number | string {
    return this.envCache.PORT ?? 5000;
  }

  get SMS_SERVICE_ACCESS_KEY(): string {
    return this.envCache.SMS_SERVICE_ACCESS_KEY ?? '';
  }

  get IS_Development(): boolean {
    return this.envCache.NODE_ENV === 'development';
  }

  get JWT_SECRET(): string {
    return this.envCache.JWT_SECRET ?? 'its_a_secret';
  }
}
