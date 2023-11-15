import { IError } from "./error.interface";
import { ILogger } from '../../logger'

export class ValidationError extends  Error implements IError {
  statusCode = 404;
  override name = 'ValidationError';
  constructor(message : string, logger: ILogger,public details?: string) {
    super(message);
    details ? logger.error(details) : logger.error(message);
  }
}