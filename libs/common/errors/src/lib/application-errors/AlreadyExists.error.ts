import { ILogger } from "@food-stories/common/logger";
import { IError } from "./error.interface";

export class AlreadyExistsError extends Error implements IError {
  statusCode = 409;
  override name = 'AlreadyExistsError'
  constructor(message: string, logger: ILogger, public details?: string) {
      super(message);
      details ? logger.warn(details) : logger.info(this.message)
  }
  
}