import { loadAppConfig } from "@food-stories/common/utils";
import { logger } from "@food-stories/posts-srv/core";

interface IAppConfig {
  GRPC_PORT: string;
  MONGODB_URI: string;
  KAFKA_URI: string;
  KAFKA_USERNAME: string;
  KAFKA_PASSWORD: string;
}

export const envKeys: string[] = [
  'GRPC_PORT',
  'MONGODB_URI',
  'KAFKA_URI',
  'KAFKA_USERNAME',
  'KAFKA_PASSWORD',
];

export const appConfig : Partial<IAppConfig> = {};




loadAppConfig(envKeys, appConfig, logger);