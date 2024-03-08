import { ILogger } from "@food-stories/common/logger";
import { IError } from "./error.interface";

export class NotFoundError  extends Error implements IError {
  statusCode = 404;
  override name = 'NotFoundError'
  constructor(messsage: string, logger: ILogger, public details?: string) {
    super(messsage);
    details ? logger.info(details) : logger.info(this.message)
  }
}