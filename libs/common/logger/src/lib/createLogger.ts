import  winston ,{ Logger, createLogger, transports, format } from 'winston';
import { ILogger } from './logger.interface';



export interface LoggerClass {
  new (componentName: string): ILogger
}

export function makeLogger(serviceName: string): LoggerClass  {
  return class implements ILogger {
    public logger: Logger;

    constructor(componentName: string) {
      this.logger = createLogger({
        level: 'info',
        format: format.combine(
          format.colorize({all: true}),
          format.timestamp(),
          format.metadata({fillExcept: ['timestamp', 'level', 'message'] }),
          format.printf(({ timestamp, level, message, metadata }) => {
            const { ...restMetadata } = metadata;
            const formattedMetadata = JSON.stringify(restMetadata);
            return `[${timestamp}] [${level}] [${serviceName}] [${componentName}] ${message} ${formattedMetadata}`;
          }),
        ),
        transports: [
          new transports.Console({
            format: format.combine(
              format.colorize(),
              format.timestamp({format: 'HH:mm:ss'}),
              format.metadata({ fillExcept: ['timestamp', 'level', 'message'] }),
              format.printf(({ timestamp, level, message, metadata }) => {
                if (Object.keys(metadata.metadata).length > 0) {
                  const formattedMetadata = Object.entries(metadata.metadata)
                  .map(([key, value]) => `\n ${key}: '${value}'`)
                  .join(', ');
                return `[${timestamp}] [${level}] [${serviceName}] [${componentName}] ${message} \n{${formattedMetadata}\n}`;
                }
                return `[${timestamp}] [${level}] [${serviceName}] [${componentName}] ${message}`
                ;
              }),
            ),
          }),
        ],
      });
    }

    static log(level: string, message: string, metadata?: unknown): void {
      winston.log(level, message, metadata);
    }

    warn(message: string, metadata?: unknown): void {
      this.logger.warn(message, metadata);
    }

    error(message: string, metadata?: unknown): void {
      this.logger.error(message, metadata)
    }

    debug(message: string, metadata?: unknown): void {
      this.logger.debug(message, metadata);
    }

    info(message: string, metadata?: unknown ): void {
      this.logger.info(message, metadata);
    }
  };
}
