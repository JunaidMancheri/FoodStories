import { ServerErrorResponse, handleUnaryCall } from "@grpc/grpc-js";
import { Action, BaseHandler, HandlerType, RequestPayload } from "../handlers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeUnaryCallHandler(handler: BaseHandler, action: Action):  handleUnaryCall<any, any> {
  return async (call, callback) => {
    const request: RequestPayload = {
      type: HandlerType.RPC,
       action,
       data: call.request,
       metadata: call.metadata,
    }
    const response = await handler.handle(request);
    if (response.status == 'error') {
      const error: ServerErrorResponse = {
        message: response.error.message,
        name: action,
      }
      callback(error);
    } else {
      callback(null, response.data);
    }
  }

}
