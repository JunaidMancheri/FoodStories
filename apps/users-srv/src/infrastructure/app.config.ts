import dotenv from 'dotenv';
import { ILogger } from '@food-stories/common/logger';

interface IAppConfig {
  GRPC_PORT: string;
}

export const appConfig : Partial<IAppConfig> = {};

export function loadAppConfig(logger: ILogger) {
  dotenv.config();
  if (!process.env['GRPC_PORT']) {
    throw new Error('GRPC_PORT must be specified');
  }
  appConfig['GRPC_PORT'] = process.env['GRPC_PORT'];

  logger.info('Loaded app config values');
}


