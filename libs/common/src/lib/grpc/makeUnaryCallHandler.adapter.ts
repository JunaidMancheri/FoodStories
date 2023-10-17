import { ServerErrorResponse, handleUnaryCall } from "@grpc/grpc-js";
import { BaseHandler, HandlerType, RequestPayload } from "../handlers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeUnaryCallHandler(handler: BaseHandler):  handleUnaryCall<any, any> {
  return async (call, callback) => {
    const request: RequestPayload = {
      type: HandlerType.RPC,
       data: call.request,
       metadata: call.metadata,
    }
    const response = await handler.handle(request);
    if (response.status == 'error') {
      const error: ServerErrorResponse = {
        message: response.error.message,
        name: response.error.code
      }
      callback(error);
    } else {
      callback(null, response.data);
    }
  }

}
