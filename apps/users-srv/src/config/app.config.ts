import { loadAppConfig } from '@food-stories/common/utils';
import { logger } from '@food-stories/users-srv/core';

interface IAppConfig {
  GRPC_PORT: string;
  MONGODB_URI: string;
  KAFKA_URI: string;
}

export const envKeys: string[] = ['GRPC_PORT', 'MONGODB_URI', 'KAFKA_URI'];

export const appConfig: Partial<IAppConfig> = {};
loadAppConfig(envKeys, appConfig, logger);
