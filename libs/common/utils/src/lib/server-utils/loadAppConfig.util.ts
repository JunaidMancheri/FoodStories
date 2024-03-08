import dotenv from 'dotenv';
import { ILogger } from '@food-stories/common/logger';

type StringIndexedObject = {
  [key: string]: string
}

export async function loadAppConfig(
  envKeys: (keyof StringIndexedObject)[],
  appConfig: StringIndexedObject,
  logger: ILogger
) {
  dotenv.config();

  for (const key of envKeys) {
    const value = process.env[key];
    if (!value) {
      throw new Error(`${key} must be specified`);
    }

    appConfig[key] = value;
  }
  logger.info('Loaded app config values');
}
