import dotenv from 'dotenv';
import { ILogger } from '@food-stories/common/logger';

interface IAppConfig {
  GRPC_PORT: string;
}

export const appConfig : Partial<IAppConfig> = {};

export function loadAppConfig(logger: ILogger) {
  dotenv.config();
  const keys: string[] = ['GRPC_PORT'];

  for (const key of keys) {
    if (!process.env[key]) {
      throw new Error(`${key} must be specified`);
    }
    appConfig['GRPC_PORT'] = process.env['GRPC_PORT'];
  }
  logger.info('Loaded app config values');
}


