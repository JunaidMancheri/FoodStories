import { loadAppConfig } from "@food-stories/common/utils";
import { logger } from "@food-stories/posts-srv/core";

interface IAppConfig {
  GRPC_PORT: string;
  MONGODB_URI: string;
  KAFKA_URL: string;
}

export const envKeys: string[] = ['GRPC_PORT', 'MONGODB_URI', 'KAFKA_URL'];

export const appConfig : Partial<IAppConfig> = {};




loadAppConfig(envKeys, appConfig, logger);