import { ILogger } from "./logger.interface";
import { Logger, createLogger, format, transports } from 'winston';

export function makeLogger(serviceName: string) {
  return class implements ILogger {
    public logger: Logger

    constructor(componentName: string) {
      this.logger = createLogger({
        level: 'info',
        format: format.combine(
          format.timestamp(),
          format.metadata({ fillExcept: ['timestamp', 'level', 'message', 'service', 'component'] }),
          format.printf(({ timestamp, level, message, metadata }) => {
            const { service, component, ...restMetadata } = metadata;
            const formattedMetadata = JSON.stringify(restMetadata);
            return `[${timestamp}] [${level.toUpperCase()}] [${service}] [${component}] ${message} ${formattedMetadata}`;
          })
        ),
        transports: [
          new transports.Console()
        ],
        defaultMeta: { service: serviceName, component: componentName }
      });
    }

    warn(message: string, metadata: unknown): void {
      this.logger.warn(message, metadata);
    }
    error(message: string, metadata: unknown): void {
      this.logger.error(message, metadata);
    }
    debug(message: string, metadata: unknown): void {
      this.logger.debug(message, metadata);
    }
    info(message: string, metadata: unknown): void {
      this.logger.info(message, metadata);
    }
    
  }
}