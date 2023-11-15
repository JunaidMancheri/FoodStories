import { IError } from "../errors/application-errors/error.interface";
import { RequestPayload } from "./Request.interface";
import { ResponsePayload, ErrorResponse } from "./Response.interface";

export abstract class BaseHandler {
  abstract execute(request: RequestPayload) : Promise<ResponsePayload>

  async handle(request: RequestPayload): Promise<ResponsePayload> {
    try {
      return await this.execute(request);
    } catch (error:  unknown) {
      return createError(error as IError)
      }
    }
  }


  function createError(error: IError): ErrorResponse {
    return  {
      status: 'error',
      error: { code: error.statusCode, message: error.message, name: error.name }
    }
  }