import dotenv from 'dotenv';
import { ILogger } from '@food-stories/common/logger';

type StringIndexedObject = {
  [key: string]: string
}

export function loadAppConfig(
  envKeys: (keyof StringIndexedObject)[],
  appConfig: StringIndexedObject,
  logger: ILogger
) {
  dotenv.config();
  let hasError = false;

  for (const key of envKeys) {
    const value = process.env[key];
    if (!value) {
      logger.error(`${key} must be specified`)
      hasError = true;
    } else {
      appConfig[key] = value;
    }
  }
  if (hasError) process.exit(1);
  logger.info('Loaded app config values');
}
