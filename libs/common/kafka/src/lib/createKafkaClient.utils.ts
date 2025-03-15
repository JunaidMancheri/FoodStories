import { ILogger } from '@food-stories/common/logger';
import { Kafka, logLevel } from 'kafkajs';

export function createKafkaClient(
  config: {
    hostUrl: string;
    clientId: string;
    username: string;
    password: string;
  },
  logger: ILogger
) {
  return new Kafka({
    brokers: [config.hostUrl],
    clientId: config.clientId,
    ssl: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 3000,
    sasl: {
      mechanism: 'plain',
      username: config.username,
      password: config.password,
    },
    logCreator: () => {
      return (entry) => {
        logger.log(toWinstonLogLevel(entry.level), entry.log.message);
      };
    },
  });
}

const toWinstonLogLevel = (level) => {
  switch (level) {
    case logLevel.ERROR:
    case logLevel.NOTHING:
      return 'error';
    case logLevel.WARN:
      return 'warn';
    case logLevel.INFO:
      return 'info';
    case logLevel.DEBUG:
      return 'debug';
  }
};
