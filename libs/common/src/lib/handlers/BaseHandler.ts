import { ILogger } from "../logger";
import { RequestPayload } from "./Request.interface";
import { ResponsePayload, ErrorResponse } from "./Response.interface";

export abstract class BaseHandler {
  constructor(protected readonly logger: ILogger) {}
  abstract execute(request: RequestPayload) : Promise<ResponsePayload>

  async handle(request: RequestPayload): Promise<ResponsePayload> {
    try {
      return await this.execute(request);
    } catch (error:  unknown) {
       this.logger.error((error as Error).message, error);
       return createError(error as  Error);
      }
    }
  }


  function createError(error: Error): ErrorResponse {
    return  {
      status: 'error',
      error: {
        code: '500',
        message: error.message
      }
    }
  }